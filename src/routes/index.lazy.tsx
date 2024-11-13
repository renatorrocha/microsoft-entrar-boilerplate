import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
} from "@azure/msal-react";
import { loginRequest } from "@services/auth/config";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleLoginRedirect = () => {
        instance
            .loginRedirect({
                ...loginRequest,
                prompt: "create",
            })
            .catch((error: any) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
        window.location.reload();
    };

    console.log(activeAccount);

    return (
        <div className="card">
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <>
                        <button onClick={handleLogoutRedirect}>Logout</button>
                        <p> You are signed in!</p>
                    </>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <button onClick={handleLoginRedirect}>Login</button>
                <p> Please sign in!</p>
            </UnauthenticatedTemplate>
        </div>
    );
}
