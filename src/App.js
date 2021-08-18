import React, {useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	IOS,
	ModalPage,
	ModalPageHeader,
	ModalRoot,
	Panel,
	PanelHeaderButton,
	PanelHeaderClose,
	Root,
	usePlatform,
	View,
	withAdaptivity
} from "@vkontakte/vkui";
import {Profile} from "./components/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {
	setActiveModal,
	setActiveView,
	setGameCollectionLoadingStatus,
	setGameList, setIsModalOpen,
	setLoading,
	setUserFromDb,
	setUserId
} from "./store/rootReducer";
import {getUserInfo, getUserToken} from "./api/vkApi/bridgeApi";
import {getUserById, getUserCollection, saveUserData} from "./api/backApi/userApi";
import {Greetings} from "./components/newUser/Greetings";
import {importGameCollection} from "./api/backApi/teseraApi";
import {GameCollectionRichCell} from "./boardGames/GameCollectionRichCell";
import {CollectionFilterModal} from "./boardGames/CollectionFiltersModal";
import {Icon24Dismiss} from "@vkontakte/icons";

const App = (props) => {
	const dispatch = useDispatch();
	const activeView = useSelector((state) => state.rootReducer.activeView);
	const activeModal = useSelector((state) => state.rootReducer.activeModal);
	const isModalOpen = useSelector((state) => state.rootReducer.isModalOpen);
	const gameList = useSelector((state) => state.rootReducer.gameList);
	const activePanel = useSelector((state) => state.rootReducer.activePanel);
	const gameCollectionLoadingStatus = useSelector((state) => state.rootReducer.gameCollectionLoadingStatus);
	const user = useSelector((state) => state.rootReducer.user);

	useEffect(() => {
		console.log(gameCollectionLoadingStatus);
	}, [gameCollectionLoadingStatus]);

	const platform = usePlatform();

	useEffect(() => {
		getUserInfo().then(data => {
			dispatch(setUserId(data.id));
			getUserById(data.id)
				.then(response => {
					dispatch(setUserFromDb(response.data));
					dispatch(setLoading(false));
				})
				.catch(error => {
					console.log(error)
					if (error.response?.status === 401) {
						getUserToken()
							.then(tokenData => {
								const userdata = {...data, token: tokenData.access_token};
								saveUserData(userdata)
									.then(response => {
										dispatch(setUserFromDb(response.data));
										dispatch(setLoading(false));
										dispatch(dispatch(setActiveView("view2")))
									})
									.catch(e=>console.log(e));
							})
							.catch(error => console.log(error));
					}
				});
		});
	}, []);

	useEffect(() => console.log(user), [user]);

	const importCollectionList = (teseraNickName) => {
		dispatch(setActiveView("view1"));
		dispatch(setGameCollectionLoadingStatus("loading"));
		importGameCollection(teseraNickName).then(data =>
			dispatch(setGameCollectionLoadingStatus("finish"))
		).catch(error =>
			dispatch(setGameCollectionLoadingStatus("error"))
		)
	}

	const loadGameList = (id) => {
		getUserCollection(id)
			.then(response => {
				dispatch(setGameList(response.data));
			})
	}

	const closeModal = () => {
		dispatch(setActiveModal(null));
	}

	const modal = (
		<ModalRoot
			onClose={closeModal}
			activeModal={activeModal ? activeModal : null}>
			<ModalPage
				id="collectionFilterModal"
				header={
					<ModalPageHeader
						left={platform !== IOS && <PanelHeaderClose onClick={closeModal}/>}
						right={platform === IOS && <PanelHeaderButton onClick={closeModal}><Icon24Dismiss /></PanelHeaderButton>}
					>
						Фильтры
					</ModalPageHeader>
				}
			>
				<CollectionFilterModal/>
			</ModalPage>
		</ModalRoot>
	)


	return (
		<ConfigProvider scheme={"bright_light"}>
			<AdaptivityProvider>
				<AppRoot>
					<Root activeView={activeView}>
						<View modal={modal} activePanel={activePanel} id="view1">
							<Panel id="panel1.1">
								<Profile loadGameList={(id) => loadGameList(id)}/>
							</Panel>
							<Panel id="panel1.2">
								<GameCollectionRichCell gameList={gameList}/>
							</Panel>
						</View>
						<View activePanel="panel2.1" id="view2">
							<Panel id="panel2.1">
								<Greetings onSubmit={(nick) => importCollectionList(nick)}/>
							</Panel>
						</View>
					</Root>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default withAdaptivity(App, { viewWidth: true });
