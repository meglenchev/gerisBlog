import { createContext, useEffect, useCallback } from "react";
import { endPoints } from "../utils/endpoints.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useRequest } from "../hooks/useRequest.js";

const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    onRegister: () => { },
    onLogin: () => { },
    onLogout: () => { },
    settingsId: '',
    setSettingsIdHandler: () => { }
});

export function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage(null, 'auth');
    const [settingsId, setSettingsId] = useLocalStorage(null, 'userSettingsId');
    const { request } = useRequest();

    // Функция за локално изчистване на данните (LocalStorage)
    const clearUserData = useCallback(() => {
        setUser(null);
        setSettingsId(null);
    }, [setUser, setSettingsId]);

    // Слушател за изтекла сесия (401 от сървъра)
    useEffect(() => {
        const handleSessionExpired = () => {
            clearUserData();
            // Тук можеш да добавиш window.location.href = '/login' ако искаш редирект
        };

        window.addEventListener('auth-session-expired', handleSessionExpired);

        return () => {
            window.removeEventListener('auth-session-expired', handleSessionExpired);
        };
    }, [clearUserData]);

    const setSettingsIdHandler = (id) => {
        setSettingsId(id);
    };

    const onRegister = async (username, email, password, confirmPassword) => {
        const result = await request(endPoints.register, 'POST', { username, email, password, confirmPassword });

        const loggedUser = {
            email: result.email,
            username: result.username,
            _id: result._id,
        };

        setUser(loggedUser);
    };

    const onLogin = async (loginData) => {
        const result = await request(endPoints.login, 'POST', loginData);

        const loggedUser = {
            email: result.email,
            username: result.username,
            _id: result._id,
        };

        setUser(loggedUser);
    };

    const onLogout = async () => {
        try {
            await request(endPoints.logout, 'POST', null);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error("Грешка при излизане:", err);
            }
        } finally {
            // Винаги чистим локалните данни, дори ако заявката към сървъра се провали
            clearUserData();
        }
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?._id,
        onRegister,
        onLogin,
        onLogout, 
        setSettingsIdHandler,
        settingsId
    };

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
