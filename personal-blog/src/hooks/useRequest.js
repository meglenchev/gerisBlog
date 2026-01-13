import { BASE_URL } from "../utils/endpoints.js";

export function useRequest() {
    const request = async (url, method = 'GET', data, signal) => {
        const options = {
            method,
            headers: {},
            credentials: 'include', // Задължително за работа с httpOnly cookies
            signal
        };

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        try {
            const res = await fetch(`${BASE_URL}${url}`, options);

            // Проверка за изтекла сесия (липсваща или невалидна бисквитка)
            if (res.status === 401) {
                // Излъчваме глобално събитие, което UserContext слуша
                window.dispatchEvent(new Event('auth-session-expired'));
                
                // Опит за извличане на съобщение от сървъра
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Сесията изтече. Моля, влезте отново.');
            }

            // Проверка за други грешки (4xx, 5xx)
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Грешка ${res.status}: ${res.statusText}`);
            }

            if (res.status === 204) {
                return null;
            }

            return await res.json();

        } catch (err) {
            if (err.name === 'AbortError') {
                return;
            }
            throw err;
        }
    };

    return {
        request
    };
}
