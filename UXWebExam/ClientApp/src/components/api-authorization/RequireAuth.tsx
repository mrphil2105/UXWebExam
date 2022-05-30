import React, { Component } from "react";
import { ApplicationPath, QueryParameterName } from "./ApiAuthorizationConstants";
import authService from "./AuthorizeService";
import { Navigate } from "react-router-dom";

interface Props {
    children?: React.ReactNode;
}

interface State {
    isReady: boolean;
    isAuthenticated: boolean;
}

export default class RequireAuth extends Component<Props, State> {
    private subscriptionId: number;

    constructor(props: Props) {
        super(props);

        this.state = {
            isReady: false,
            isAuthenticated: false
        }
    }

    public componentDidMount() {
        this.subscriptionId = authService.subscribe(() => this.authenticationChanged());
        this.populateAuthenticationState();
    }

    public componentWillUnmount() {
        authService.unsubscribe(this.subscriptionId);
    }

    public render() {
        const { isReady, isAuthenticated } = this.state;

        if (!isReady) {
            return (<div></div>);
        }

        if (isAuthenticated) {
            return this.props.children;
        }

        const location = window.location;
        const returnUrl = `${location.protocol}//${location.host}${location.pathname}${location.search}${location.hash}`;
        const redirectUrl = `/${ApplicationPath.ApiAuthorizationPrefix}/${ApplicationPath.Login}?${QueryParameterName.ReturnUrl}=${encodeURIComponent(returnUrl)}`;

        return (<Navigate to={redirectUrl} replace />);
    }

    private async populateAuthenticationState() {
        const isAuthenticated = await authService.isAuthenticated();
        this.setState({ isReady: true, isAuthenticated });
    }

    private async authenticationChanged() {
        this.setState({ isReady: false, isAuthenticated: false });
        await this.populateAuthenticationState();
    }
}
