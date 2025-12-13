import { Navigate, Outlet } from "react-router"

export function RegisteredOnlyRoute({isAuthenticated}) {
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Outlet />
}