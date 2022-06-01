import React, { Component } from "react";
import authService from "./AuthorizeService";
import { ApplicationPath } from "./ApiAuthorizationConstants";
import { Button, MenuItem, Typography } from "@mui/material";
import { Link, To } from "react-router-dom";

interface LogoutPath {
    pathname: string;
    state: any;
}

interface Props {
    isMobile: boolean;
}

interface State {
    isAuthenticated: boolean;
    username?: string | null;
}

export class LoginMenu extends Component<Props, State> {
    private subscriptionId: number;

    constructor(props: Props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            username: null
        };
    }

    public componentDidMount() {
        this.subscriptionId = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    public componentWillUnmount() {
        authService.unsubscribe(this.subscriptionId);
    }

    public render() {
        const { isAuthenticated, username } = this.state;

        if (!isAuthenticated) {
            const registerPath = `${ApplicationPath.ApiAuthorizationPrefix}/${ApplicationPath.Register}`;
            const loginPath = `${ApplicationPath.ApiAuthorizationPrefix}/${ApplicationPath.Login}`;
            return this.anonymousView(registerPath, loginPath);
        }

        const logoutPath = {
            pathname: `${ApplicationPath.ApiAuthorizationPrefix}/${ApplicationPath.Logout}`,
            state: { local: true, kebab: 69 }
        };
        return this.authenticatedView(logoutPath);
    }

    private anonymousView(registerPath: string, loginPath: string) {
        return (<>
            <Link to={registerPath}
                  style={{
                      textDecoration: "none",
                      color: "inherit",
                  }}>
                {this.props.isMobile ?
                    (<MenuItem key="Register">
                        <Typography textAlign="center">Register</Typography>
                    </MenuItem>) :
                    (<Button key="Register" sx={{ my: 2, color: "white", display: "block", }}>Register</Button>)
                }
            </Link>
            <Link to={loginPath}
                  style={{
                      textDecoration: "none",
                      color: "inherit",
                  }}>
                {this.props.isMobile ?
                    (<MenuItem key="Login">
                        <Typography textAlign="center">Login</Typography>
                    </MenuItem>) :
                    (<Button key="Login" sx={{ my: 2, color: "white", display: "block", }}>Login</Button>)
                }
            </Link>
        </>);
    }

    private authenticatedView(logoutPath: LogoutPath) {
        return (<>
            <Link to={logoutPath.pathname} state={logoutPath.state}
                  style={{
                      textDecoration: "none",
                      color: "inherit",
                  }}>
                {this.props.isMobile ?
                    (<MenuItem key="Logout">
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>) :
                    (<Button key="Logout" sx={{ my: 2, color: "white", display: "block", }}>Logout</Button>)
                }
            </Link>
        </>);
    }

    private async populateState() {
        const [ isAuthenticated, user ] = await Promise.all([ authService.isAuthenticated(), authService.getUser() ]);

        this.setState({
            isAuthenticated,
            username: user && user.name
        });
    }
}
