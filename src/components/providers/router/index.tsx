import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "../query/query-client";

const router = createRouter({
    basepath: import.meta.env.VITE_BASE_URL || "/",
    routeTree,
    context: {
        queryClient,
        auth: undefined!,
    },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export default function RouterApp() {
    return <RouterProvider router={router} />;
}
