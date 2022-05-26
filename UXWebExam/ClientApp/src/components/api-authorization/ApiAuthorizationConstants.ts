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

const prefix = "authentication";

export const ApplicationPath = {
    ApiAuthorizationPrefix: prefix,
    ApiAuthorizationClientConfigurationUrl: `_configuration/${ApplicationName}`,
    Login: LoginAction.Login,
    LoginCallback: LoginAction.LoginCallback,
    LoginFailed: LoginAction.LoginFailed,
    Register: LoginAction.Register,
    Profile: LoginAction.Profile,
    Logout: LogoutAction.Logout,
    LogoutCallback: LogoutAction.LogoutCallback,
    LoggedOut: LogoutAction.LoggedOut,
    IdentityRegisterPath: "Identity/Account/Register",
    IdentityManagePath: "Identity/Account/Manage"
};
