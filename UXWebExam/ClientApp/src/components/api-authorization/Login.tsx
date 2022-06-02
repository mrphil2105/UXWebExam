import React, { Component } from "react";
import { ApplicationPath, LoginAction, QueryParameterName } from "./ApiAuthorizationConstants";
import authService, { AuthenticationResultStatus } from "./AuthorizeService";

interface Props {
    action: LoginAction;
}

interface State {
    message: string | null;
}

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            message: null
        };
    }

    public componentDidMount() {
        const action = this.props.action;

        switch (action) {
            case LoginAction.Login:
                this.login(Login.getReturnUrl());
                break;
            case LoginAction.LoginCallback:
                this.processLoginCallback();
                break;
            case LoginAction.LoginFailed:
                const params = new URLSearchParams(window.location.search);
                const error = params.get(QueryParameterName.Message);
                this.setState({ message: error });
                break;
            case LoginAction.Profile:
                Login.redirectToProfile();
                break;
            case LoginAction.Register:
                Login.redirectToRegister();
                break;
            default:
                throw new Error(`Invalid action '${action}'.`);
        }
    }

    public render() {
        const { message } = this.state;

        if (!!message) {
            return (<div>{message}</div>);
        }

        const action = this.props.action;

        switch (action) {
            case LoginAction.Login:
                return (<div>Processing login...</div>);
            case LoginAction.LoginCallback:
                return (<div>Processing login callback...</div>);
            case LoginAction.Profile:
            case LoginAction.Register:
                return (<div></div>);
            default:
                throw new Error(`Invalid action '${action}'.`);
        }
    }

    private async login(returnUrl: string) {
        const state = { returnUrl };
        const result = await authService.signIn(state);

        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                break;
            case AuthenticationResultStatus.Success:
                await Login.navigateToReturnUrl(returnUrl);
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                break;
            default:
                throw new Error(`Invalid status result ${result.status}.`);
        }
    }

    private async processLoginCallback() {
        const url = window.location.href;
        const result = await authService.completeSignIn(url);

        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                throw new Error("Should not redirect.");
            case AuthenticationResultStatus.Success:
                await Login.navigateToReturnUrl(Login.getReturnUrl(result.state));
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                break;
            default:
                throw new Error(`Invalid authentication result status '${result.status}'.`);
        }
    }

    private static getReturnUrl(state?: any) {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterName.ReturnUrl);

        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            throw new Error("Invalid return URL. The return URL needs to have the same origin as the current page.")
        }

        return (state && state.returnUrl) || fromQuery || `${window.location.origin}/`;
    }

    private static redirectToRegister() {
        const loginPath = `/${ApplicationPath.ApiAuthorizationPrefix}/${ApplicationPath.Login}`;
        Login.redirectToApiAuthorizationPath(`${ApplicationPath.IdentityRegisterPath}?${QueryParameterName.ReturnUrl}=${encodeURI(loginPath)}`);
    }

    private static redirectToProfile() {
        Login.redirectToApiAuthorizationPath(ApplicationPath.IdentityManagePath);
    }

    private static redirectToApiAuthorizationPath(apiAuthorizationPath: string) {
        const redirectUrl = `${window.location.origin}/${apiAuthorizationPath}`;
        window.location.replace(redirectUrl);
    }

    private static navigateToReturnUrl(returnUrl: string) {
        window.location.replace(returnUrl);
    }
}
