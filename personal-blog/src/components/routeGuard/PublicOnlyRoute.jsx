import { Navigate, Outlet } from "react-router"

export function PublicOnlyRoute({isAuthenticated}) {
    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Outlet />
}