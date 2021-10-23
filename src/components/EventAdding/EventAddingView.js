import {Panel, View} from "@vkontakte/vkui";
import {PlaceChoice} from "./Step1-0_PlaceChoice";
import {NewAddressCreating} from "./Step1-1_NewAddressCreating";
import React from "react";
import {saveNewTable, saveNewUserPlace} from "../../api/backApi/PlacesApi";
import {TableAdding} from "./Step1-2_TableAdding";
import {connect} from "react-redux";
import {addPanelInStack, goToPreviousPanel} from "../../store/rootReducer";
import {CREATE_TABLE, NEW_ADDRESS_CREATING, PLACE_CHOICE, TABLE_ADDING} from "./Panels";
import {CreateTableForm} from "./Step1-3_CreateTableForm";

const mapStateToProps = (state) => ({
    panelStack: state.rootReducer.panelStack
});

const mapDispatchToProps = {addPanelInStack, goToPreviousPanel};

class EventAddingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPublic: false,
            selectedPlace: {}
        }
    }

    clickAddPlaceButton(isPublic) {
        this.setState({
            isPublic: isPublic
        }, () => this.props.addPanelInStack(NEW_ADDRESS_CREATING));
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
       saveNewTable(this.state.selectedPlace.id, placeForm)
           .then(r => {
               this.props.goToPreviousPanel()
           })
           .catch(e => console.log(e));
    }

    render() {
        return (
            <View activePanel={this.getActivePanel()} id={"createEvent"}>
                <Panel id={PLACE_CHOICE}>
                    <PlaceChoice userId={this.props.userId}
                                 onNewPlace = {(isPublic) => this.clickAddPlaceButton(isPublic)}/>
                </Panel>
                <Panel id={NEW_ADDRESS_CREATING}>
                    <NewAddressCreating
                        userId={this.props.userId}
                        isPublic={this.state.isPublic}
                        onContinue={(panel, placeConf) => this.saveNewUserPlace(panel, placeConf)}/>
                </Panel>
                <Panel id={TABLE_ADDING}>
                    <TableAdding selectedPlace={this.state.selectedPlace} addPanelInStack={this.props.addPanelInStack}/>
                </Panel>
                <Panel id={CREATE_TABLE}>
                    <CreateTableForm
                        onSaveTable={(placeForm) => this.onSaveTable(placeForm)}/>
                </Panel>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventAddingView);