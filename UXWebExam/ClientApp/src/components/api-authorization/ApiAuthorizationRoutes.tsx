import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { ApplicationPath, LoginAction, LogoutAction } from "./ApiAuthorizationConstants";
import { Route, Routes } from "react-router-dom";

export default () => (
    <Routes>
        <Route path={ApplicationPath.Login} element={loginAction(LoginAction.Login)} />
        <Route path={ApplicationPath.LoginCallback} element={loginAction(LoginAction.LoginCallback)} />
        <Route path={ApplicationPath.LoginFailed} element={loginAction(LoginAction.LoginFailed)} />
        <Route path={ApplicationPath.Register} element={loginAction(LoginAction.Register)} />
        <Route path={ApplicationPath.Profile} element={loginAction(LoginAction.Profile)} />
        <Route path={ApplicationPath.Logout} element={logoutAction(LogoutAction.Logout)} />
        <Route path={ApplicationPath.LogoutCallback} element={logoutAction(LogoutAction.LogoutCallback)} />
        <Route path={ApplicationPath.LoggedOut} element={logoutAction(LogoutAction.LoggedOut)} />
    </Routes>
);

function loginAction(action: LoginAction) {
    return (<Login action={action} />);
}

function logoutAction(action: LogoutAction) {
    return (<Logout action={action} />);
}
