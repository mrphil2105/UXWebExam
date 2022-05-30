import React, { Component } from "react";
import { ApplicationPath, LogoutAction, QueryParameterName } from "./ApiAuthorizationConstants";
import authService, { AuthenticationResultStatus } from "./AuthorizeService";

interface Props {
    action: LogoutAction;
}

interface State {
    message: string | null;
    isReady: boolean;
    isAuthenticated: boolean;
}

export default class Logout extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            message: null,
            isReady: false,
            isAuthenticated: false
        }
    }

    public componentDidMount() {
        const action = this.props.action;

        switch (action) {
            case LogoutAction.Logout:
                if (!!window.history.state.state.local) {
                    this.logout(Logout.getReturnUrl());
                } else {
                    this.setState({ isReady: true, message: "The logout was not initiated from within the page." });
                }
                break;
            case LogoutAction.LogoutCallback:
                this.processLogoutCallback();
                break;
            case LogoutAction.LoggedOut:
                this.setState({ isReady: true, message: "You successfully logged out!" });
                break;
            default:
                throw new Error(`Invalid action '${action}'.`);
        }

        this.populateAuthenticationState();
    }

    public render() {
        const { isReady, message } = this.state;

        if (!isReady) {
            return (<div></div>);
        }

        if (!!message) {
            return (<div>{message}</div>);
        }

        const action = this.props.action;

        switch (action) {
            case LogoutAction.Logout:
                return (<div>Processing logout...</div>);
            case LogoutAction.LogoutCallback:
                return (<div>Processing logout callback...</div>);
            case LogoutAction.LoggedOut:
                return (<div>{message}</div>);
            default:
                throw new Error(`Invalid action '${action}'.`);
        }
    }

    private async logout(returnUrl: string) {
        const state = { returnUrl };
        const isAuthenticated = await authService.isAuthenticated();

        if (isAuthenticated) {
            const result = await authService.signOut(state);

            switch (result.status) {
                case AuthenticationResultStatus.Redirect:
                    break;
                case AuthenticationResultStatus.Success:
                    await Logout.navigateToReturnUrl(returnUrl);
                    break;
                case AuthenticationResultStatus.Fail:
                    this.setState({ message: result.message });
                    break;
                default:
                    throw new Error(`Invalid status result ${result.status}.`);
            }
        } else {
            this.setState({ message: "You successfully logged out!" });
        }
    }

    private async processLogoutCallback() {
        const url = window.location.href;
        const result = await authService.completeSignOut(url);

        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                throw new Error("Should not redirect.");
            case AuthenticationResultStatus.Success:
                await Logout.navigateToReturnUrl(Logout.getReturnUrl(result.state));
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                break;
            default:
                throw new Error(`Invalid authentication result status '${result.status}'.`);
        }
    }

    private async populateAuthenticationState() {
        const isAuthenticated = await authService.isAuthenticated();
        this.setState({ isReady: true, isAuthenticated });
    }

    private static getReturnUrl(state?: any) {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterName.ReturnUrl);

        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            throw new Error("Invalid return URL. The return URL needs to have the same origin as the current page.")
        }

        return (state && state.returnUrl) || fromQuery || `${window.location.origin}${ApplicationPath.LoggedOut}`;
    }

    private static navigateToReturnUrl(returnUrl: string) {
        window.location.replace(returnUrl);
    }
}
