import React, {useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BottomNavigation, BottomNavigationAction, Box} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ViewListIcon from '@material-ui/icons/ViewList';
import {AdaptivityProvider, AppRoot, ConfigProvider, withAdaptivity} from "@vkontakte/vkui";
import axiosInstance from "./axios/axiosInstance";

const App = (props) => {

	useEffect(() => {
		axiosInstance.get("user/564867").then(r => console.log(r)).catch(r => console.log(r));
	}, [props]);

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<>
						<Box style={{width: "100%", height: "calc(100vh - 56px"}}>
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

export default withAdaptivity(App, { viewWidth: true });;
