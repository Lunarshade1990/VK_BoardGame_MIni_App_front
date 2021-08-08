import React, {useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BottomNavigation, BottomNavigationAction, Box} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ViewListIcon from '@material-ui/icons/ViewList';
import {AdaptivityProvider, AppRoot, ConfigProvider, withAdaptivity} from "@vkontakte/vkui";
import axiosInstance from "./axios/axiosInstance";
import {Profile} from "./components/Profile/Profile";
import bridge from "@vkontakte/vk-bridge";
import {useDispatch, useSelector} from "react-redux";
import {setUserId} from "./store/rootReducer";

const App = (props) => {
	const userId = useSelector((state) => state.rootReducer.userId);
	const dispatch = useDispatch();

	useEffect(() => {
		bridge.send("VKWebAppGetUserInfo").then(data => {
			console.log(data.id);
			dispatch(setUserId(data.id));
			axiosInstance.get(`user/${data.id}`)
				.then(r => console.log(r))
				.catch(r => console.log(r));
		});
	});

	useEffect(() => {
		if (userId !== 0) {
			console.log(userId);

		}
	}, [userId]);


	return (

		<ConfigProvider>
			<AdaptivityProvider>
					<AppRoot>
						<>
							<Box style={{width: "100%", height: "calc(100vh - 56px"}}>
								<Profile/>
								<div/>
							</Box>
							<BottomNavigation showLabels value={"Профиль"} style={{width: "100%"}}>
								<BottomNavigationAction label="Профиль" icon={<AccountCircleIcon />} />
								<BottomNavigationAction label="Встречи" icon={<DateRangeIcon />} />
								<BottomNavigationAction label="Список игр" icon={<ViewListIcon />} />
							</BottomNavigation>
						</>
					</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>

	);
}

export default withAdaptivity(App, { viewWidth: true });
