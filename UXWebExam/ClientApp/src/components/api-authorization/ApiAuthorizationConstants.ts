export const ApplicationName = "UXWebExam";

export enum QueryParameterName {
    ReturnUrl = "returnUrl",
    Message = "message"
}

export enum LogoutAction {
    Logout = "logout",
    LogoutCallback = "logout-callback",
    LoggedOut = "logged-out"
}

export enum LoginAction {
    Login = "login",
    LoginCallback = "login-callback",
    LoginFailed = "login-failed",
    Register = "register",
    Profile = "profile"
}

const prefix = "/authentication";

export const ApplicationPath = {
    ApiAuthorizationPrefix: prefix,
    DefaultLoginRedirectPath: "/",
    ApiAuthorizationClientConfigurationUrl: `_configuration/${ApplicationName}`,
    Login: `${prefix}/${LoginAction.Login}`,
    LoginCallback: `${prefix}/${LoginAction.LoginCallback}`,
    LoginFailed: `${prefix}/${LoginAction.LoginFailed}`,
    Register: `${prefix}/${LoginAction.Register}`,
    Profile: `${prefix}/${LoginAction.Profile}`,
    Logout: `${prefix}/${LogoutAction.Logout}`,
    LogoutCallback: `${prefix}/${LogoutAction.LogoutCallback}`,
    LoggedOut: `${prefix}/${LogoutAction.LoggedOut}`,
    IdentityRegisterPath: "Identity/Account/Register",
    IdentityManagePath: "Identity/Account/Manage"
};
