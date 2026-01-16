import { Navigate, Outlet } from "react-router"

export function RegisteredOnlyRoute({isAuthenticated, userRoles}) {
    const noAccess = userRoles !== 'admin' && userRoles !== 'moderator';
    
    if (!isAuthenticated && noAccess) {
        return <Navigate to="/" />
    }

    return <Outlet />
}