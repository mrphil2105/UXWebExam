export const ApplicationName = "WebApplication2";

export enum QueryParameterName {
    ReturnUrl = "returnUrl",
    Message = "message"
}

export enum LogoutAction {
    LogoutCallback = "logout-callback",
    Logout = "logout",
    LoggedOut = "logged-out"
}

export enum LoginAction {
    Login = "login",
    LoginCallback = "login-callback",
    LoginFailed = "login-failed",
    Profile = "profile",
    Register = "register"
}

const prefix = "/authentication";

export const ApplicationPath = {
    DefaultLoginRedirectPath: "/",
    ApiAuthorizationClientConfigurationUrl: `_configuration/${ApplicationName}`,
    ApiAuthorizationPrefix: prefix,
    Login: `${prefix}/${LoginAction.Login}`,
    LoginFailed: `${prefix}/${LoginAction.LoginFailed}`,
    LoginCallback: `${prefix}/${LoginAction.LoginCallback}`,
    Register: `${prefix}/${LoginAction.Register}`,
    Profile: `${prefix}/${LoginAction.Profile}`,
    LogOut: `${prefix}/${LogoutAction.Logout}`,
    LoggedOut: `${prefix}/${LogoutAction.LoggedOut}`,
    LogOutCallback: `${prefix}/${LogoutAction.LogoutCallback}`,
    IdentityRegisterPath: "Identity/Account/Register",
    IdentityManagePath: "Identity/Account/Manage"
};
