import {Panel, View} from "@vkontakte/vkui";
import {PlaceChoice} from "./Step1-0_PlaceChoice";
import {NewAddressCreating} from "./Step1-1_NewAddressCreating";
import React from "react";
import {deleteTable, saveNewTable, saveNewUserPlace, updateTable} from "../../api/backApi/PlacesApi";
import {TableAdding} from "./Step1-2_TableAdding";
import {connect} from "react-redux";
import {addPanelInStack, goToPreviousPanel, removePreviousPanels, setNewPanelStack} from "../../store/rootReducer";
import {
    CREATE_TABLE,
    EVENT_TYPE_SELECTION,
    GAME_SELECTING,
    NEW_ADDRESS_CREATING,
    PLACE_CHOICE,
    PLAY_FORM, SIMPLE_EVENT,
    TABLE_ADDING
} from "./Panels";
import {CreateTableForm} from "./Step1-3_CreateTableForm";
import {EventTypeSelection} from "./Step2-1_EventTypeSelection";
import {GameCollection} from "../boardGames/GameCollection";
import {GameEvent} from "./GameEvent/EventUtil/GameEvent";
import {EventPlay} from "./GameEvent/EventUtil/EventPlay";
import {EventTable} from "./GameEvent/EventUtil/EventTable";
import {PlayForm} from "./Step2-3_PlayForm";
import produce from "immer"
import {SimpleEvent} from "./GameEvent/Event/SimpleEvent";
import {addPlay, addPlayToEvent, saveNewGameEvent, updatePlay} from "../../api/backApi/GameEventApi";

const mapStateToProps = (state) => ({
    panelStack: state.rootReducer.panelStack,
    user: state.rootReducer.user
});

const mapDispatchToProps = {addPanelInStack, goToPreviousPanel, setNewPanelStack};

class EventAddingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPublic: false,
            selectedPlace: {},
            selectedTable: null,
            panelShouldUpdate: true,
            gameEvent: null,
            responseGameEvent: null,
            selectedPlay: null,
            currentTableId: null,
            currentPlayId: null,
            selectedGame: null,
            formAction: 'create'
        }
    }

    clearState () {
        this.setState({
            isPublic: false,
            selectedPlace: {},
            selectedTable: null,
            panelShouldUpdate: true,
            gameEvent: null,
            responseGameEvent: null,
            selectedPlay: null,
            currentTableId: null,
            currentPlayId: null,
            selectedGame: null,
            formAction: 'create',
        })
    }

    onPlaceSelect(place) {
        this.setState({selectedPlace: {...place}},
            () => this.props.addPanelInStack(EVENT_TYPE_SELECTION)
        );
    }

    onEventTypeSelect(type) {
        const gameEvent = new GameEvent(type);
        if (type === 'simple') {
            const virtualTable = new EventTable('virtual');
            const tableId = gameEvent.addTable(virtualTable);
            const newPlay = new EventPlay();
            const playId = virtualTable.addPlay(newPlay)
            this.setState({currentTableId: tableId, currentPlayId: playId})
        }
        this.setState({
            gameEvent: {...gameEvent}
        }, () => this.props.addPanelInStack(GAME_SELECTING));
    }

    clickAddPlaceButton(isPublic) {
        this.setState({
            isPublic: isPublic
        }, () => this.props.addPanelInStack(NEW_ADDRESS_CREATING));
    }

    onGameSelect(game) {
        this.setState({selectedGame: game, selectedPlay: null}, () => {
            this.props.addPanelInStack(PLAY_FORM);
        });

    }

    getCurrentPlay() {
        if (this.state.gameEvent) {
            const currentPlay = this.state.gameEvent
                .getTableById(this.state.currentTableId)
                .getPlayById(this.state.currentPlayId)
            return {...currentPlay}
        } else return null;
    }

    saveNewUserPlace(panel, placeConf) {
        saveNewUserPlace(placeConf)
            .then(r => {
                this.setState({selectedPlace: r.data},
                    () => this.props.addPanelInStack(panel));
            })
            .catch(e => console.log(e));
    }

    getActivePanel() {
        const ind = this.props.panelStack.length - 1;
        return this.props.panelStack[ind]
    }

    onSaveTable(placeForm) {
        if (placeForm.id) {
            updateTable(placeForm)
                .then(r => this.afterSuccessSavingTable())
                .catch(e => console.log(e));
        } else {
            saveNewTable(this.state.selectedPlace.id, placeForm)
                .then(r => this.afterSuccessSavingTable())
                .catch(e => console.log(e));
        }
    }

    afterSuccessSavingTable() {
        this.props.goToPreviousPanel();
        this.setState({selectedTable: null})
    }

    onEditTable(table) {
        this.setState({selectedTable: table}, () => {
            this.props.addPanelInStack(CREATE_TABLE);
        });
    }

    onDeleteTable(id) {
        deleteTable(id)
            .then(r => this.setState({panelShouldUpdate: true}))
            .catch(e => console.log(e));
    }

    onSaveEvent(eventForm) {
        saveNewGameEvent(eventForm)
            .then(r => {
                this.setState({
                    responseGameEvent: r.data,
                    selectedPlay: r.data.plays[0],
                    selectedTable: r.data.plays[0].table
                }, () => {
                    this.props.setNewPanelStack([PLACE_CHOICE, SIMPLE_EVENT]);
                });
            })
            .catch(e => console.log(e));
    }

    onUpdatePlay(playRq) {
        updatePlay(playRq)
            .then(r => {
                this.setState(produce(draft => {
                        draft.responseGameEvent.plays.forEach((play, ind) => {
                            if (play.id === r.data.id) {
                                draft.responseGameEvent.plays[ind] = r.data;
                            }
                        });
                    }),() => this.props.addPanelInStack(SIMPLE_EVENT)
                )
            })
    }

    addNewGameToEvent () {
        this.setState({formAction: 'add'}, () => this.props.addPanelInStack(GAME_SELECTING));
    }

    onAddPlayToEvent(playRq) {
        addPlay(this.state.responseGameEvent.id, playRq)
            .then(r => {
                this.setState(produce(draft => {
                        draft.responseGameEvent.plays.push(r.data);
                        const dates = draft.responseGameEvent.plays.flatMap(play => {
                            return [new Date(play.startDate), new Date(play.endDate)];
                        }).sort((d1, d2) => d1.getTime()-d2.getTime());
                        draft.responseGameEvent.startDate = dates[0];
                        draft.responseGameEvent.endDate = dates[dates.length - 1];
                    }), () => this.props.addPanelInStack(SIMPLE_EVENT)
                )
            })

    }

    render() {
        return (
            <View activePanel={this.props.activePanel} id={"createEvent"}>
                <Panel id={PLACE_CHOICE}>
                    <PlaceChoice userId={this.props.userId}
                                 onPlaceSelect = {(place) => this.onPlaceSelect(place)}
                                 onNewPlace = {(isPublic) => this.clickAddPlaceButton(isPublic)}
                                 clearState = {() => this.clearState()}
                    />
                </Panel>
                <Panel id={EVENT_TYPE_SELECTION}>
                    <EventTypeSelection
                        place = {this.state.selectedPlace}
                        onTypeSelect = {(type) => this.onEventTypeSelect(type)}
                    />
                </Panel>
                <Panel id={NEW_ADDRESS_CREATING}>
                    <NewAddressCreating
                        userId={this.props.userId}
                        isPublic={this.state.isPublic}
                        onContinue={(panel, placeConf) => this.saveNewUserPlace(panel, placeConf)}
                        selectedAddress={this.state.selectedPlace}
                        setSelectedAddress={(selectedAddress) => this.setState({selectedPlace: selectedAddress})}
                    />
                </Panel>
                <Panel id={TABLE_ADDING}>
                    <TableAdding
                        selectedPlace={this.state.selectedPlace}
                        addPanelInStack={this.props.addPanelInStack}
                        onEditTable={(table) => this.onEditTable(table)}
                        onDeleteTable={(id) => this.onDeleteTable(id)}
                        panelShouldUpdate={this.state.panelShouldUpdate}
                        panelWasUpdated={(status) => this.setState({panelShouldUpdate: !status})}
                    />
                </Panel>
                <Panel id={CREATE_TABLE}>
                    <CreateTableForm
                        onSaveTable={(placeForm) => this.onSaveTable(placeForm)}
                        table={this.state.selectedTable}
                    />
                </Panel>
                <Panel id={GAME_SELECTING}>
                    <GameCollection
                        loadGameList={this.props.loadGameList}
                        onCardClick = {(game) => this.onGameSelect(game)}
                    />
                </Panel>
                <Panel id={PLAY_FORM}>
                    <PlayForm
                        place={this.state.selectedPlace}
                        selectedGame={this.state.selectedGame}
                        selectedTable={this.state.selectedTable}
                        user={this.props.user.id}
                        currPlay={this.state.selectedPlay}
                        onSaveEvent={(playForm) => this.onSaveEvent(playForm)}
                        onUpdatePlay={(playRq) => this.onUpdatePlay(playRq)}
                        onAddPlayToEvent = {(playRq) => this.onAddPlayToEvent(playRq)}
                        formAction={this.state.formAction}
                    />
                </Panel>
                <Panel id={SIMPLE_EVENT}>
                    <SimpleEvent
                        event={this.state.responseGameEvent}
                        userId={this.props.userId}
                        setSelectedPlay={(play, callback) => this.setState({selectedPlay: play}, () => callback)}
                        addNewGameToEvent={() => this.addNewGameToEvent()}
                    />
                </Panel>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventAddingView);