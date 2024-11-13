import {
    AuthenticationResult,
    EventType,
    PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@services/auth/config";
import { PropsWithChildren } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
    const msalInstance = new PublicClientApplication(msalConfig);

    if (
        !msalInstance.getActiveAccount() &&
        msalInstance.getAllAccounts().length > 0
    ) {
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }

    // Listen for sign-in event and set active account
    msalInstance.addEventCallback((event) => {
        const authenticationResult = event.payload as AuthenticationResult;
        const account = authenticationResult?.account;
        if (event.eventType === EventType.LOGIN_SUCCESS && account) {
            msalInstance.setActiveAccount(account);
        }
    });

    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}

export function useAuthProvider() {
    return { AuthProvider };
}
