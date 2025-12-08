import { Navigate, Outlet } from "react-router"

export function RouteGuard({isAuthenticated}) {
    if (!isAuthenticated) {
        return <Navigate to="/user/login" />
    }

    return <Outlet />
}