import bridge from "@vkontakte/vk-bridge";

const getUserInfo = async () => {
    return await bridge.send("VKWebAppGetUserInfo")
}

const getUserToken = async () => {
    return await bridge.send("VKWebAppGetAuthToken", {"app_id": 7908166, "scope": "friends"});
}

export {getUserInfo, getUserToken};