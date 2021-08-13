import React, {useEffect, useState} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	Panel,
	Root,
	usePlatform,
	View,
	withAdaptivity
} from "@vkontakte/vkui";
import {Profile} from "./components/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {
	setUserId,
	setUserFromDb,
	setLoading,
	setActiveView,
	setGameCollectionLoadingStatus,
	setGameList
} from "./store/rootReducer";
import {getUserInfo, getUserToken} from "./api/vkApi/bridgeApi";
import {getUserById, getUserCollection, saveUserData} from "./api/backApi/userApi";
import {Greetings} from "./components/newUser/Greetings";
import {GameCollection} from "./boardGames/GameCollection";
import {importGameCollection} from "./api/backApi/teseraApi";
import {GameCollectionRichCell} from "./boardGames/GameCollectionRichCell";

const App = (props) => {
	const dispatch = useDispatch();
	const activeView = useSelector((state) => state.rootReducer.activeView);
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


	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<Root activeView={activeView}>
						<View activePanel={activePanel} id="view1">
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
