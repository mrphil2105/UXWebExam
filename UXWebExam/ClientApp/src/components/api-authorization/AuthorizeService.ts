import { User, UserManager, WebStorageStateStore } from "oidc-client";
import { ApplicationPaths, ApplicationName } from "./ApiAuthorizationConstants";

interface Callback {
    callback: () => void;
    subscriptionId: number;
}

export class AuthorizeService {
    private callbacks: Callback[] = [];
    private nextSubscriptionId = 0;
    private user: User | null = null;
    private userManager: UserManager;

    public async isAuthenticated() {
        const user = await this.getUser();
        return !!user;
    }

    public async getUser() {
        if (this.user && this.user.profile) {
            return this.user.profile;
        }

        await this.ensureUserManagerInitialized();
        const user = await this.userManager.getUser();
        return user && user.profile;
    }

    public async getAccessToken() {
        await this.ensureUserManagerInitialized();
        const user = await this.userManager.getUser();
        return user && user.access_token;
    }

    public async signIn(state: any) {
        await this.ensureUserManagerInitialized();
        try {
            const silentUser = await this.userManager.signinSilent(this.createArguments());
            this.updateState(silentUser);
            return this.success(state);
        } catch (silentError) {
            console.log("Silent authentication error: ", silentError);

            try {
                await this.userManager.signinRedirect(this.createArguments(state));
                return this.redirect();
            } catch (redirectError) {
                console.log("Redirect authentication error: ", redirectError);
                return this.error(redirectError);
            }
        }
    }

    public async completeSignIn(url: string) {
        try {
            await this.ensureUserManagerInitialized();
            const user = await this.userManager.signinCallback(url);
            this.updateState(user);
            return this.success(user && user.state);
        } catch (error) {
            console.log("There was an error signing in: ", error);
            return this.error("There was an error signing in.");
        }
    }

    public async signOut(state: any) {
        await this.ensureUserManagerInitialized();

        try {
            await this.userManager.signoutRedirect(this.createArguments(state));
            return this.redirect();
        } catch (redirectSignOutError) {
            console.log("Redirect sign out error: ", redirectSignOutError);
            return this.error(redirectSignOutError);
        }
    }

    public async completeSignOut(url: string) {
        await this.ensureUserManagerInitialized();

        try {
            const response = await this.userManager.signoutCallback(url);
            this.updateState(null);
            return this.success(response && response.state);
        } catch (error) {
            console.log(`There was an error trying to log out '${error}'.`);
            return this.error(error);
        }
    }

    public subscribe(callback: () => void) {
        this.callbacks.push({ callback, subscriptionId: this.nextSubscriptionId++ });
        return this.nextSubscriptionId - 1;
    }

    public unsubscribe(subscriptionId: number) {
        const index = this.callbacks.findIndex(c => c.subscriptionId === subscriptionId);

        if (index !== -1) {
            this.callbacks.splice(index, 1);
        }
    }

    private notifySubscribers() {
        this.callbacks.forEach(c => c.callback());
    }

    private updateState(user: User | null) {
        this.user = user;
        this.notifySubscribers();
    }

    private createArguments(state?: any) {
        return { useReplaceToNavigate: true, data: state };
    }

    private error(message: string) {
        return { status: AuthenticationResultStatus.Fail, message };
    }

    private success(state: any) {
        return { status: AuthenticationResultStatus.Success, state };
    }

    private redirect() {
        return { status: AuthenticationResultStatus.Redirect };
    }

    private async ensureUserManagerInitialized() {
        if (this.userManager !== undefined) {
            return;
        }

        const response = await fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);

        if (!response.ok) {
            throw new Error(`Could not load settings for '${ApplicationName}'`);
        }

        const settings = await response.json();
        settings.automaticSilentRenew = true;
        settings.includeIdTokenInSilentRenew = true;
        settings.userStore = new WebStorageStateStore({
            prefix: ApplicationName
        });

        this.userManager = new UserManager(settings);

        this.userManager.events.addUserSignedOut(async () => {
            await this.userManager.removeUser();
            this.updateState(null);
        });
    }
}

const authService = new AuthorizeService();

export default authService;

export const AuthenticationResultStatus = {
    Redirect: "redirect",
    Success: "success",
    Fail: "fail"
};
