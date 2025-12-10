import { useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext.jsx";
import { useEffect } from "react";

export default function UserLogout() {
    const { onLogout } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        onLogout()
            .catch((err) => {
                console.error("Logout error:", err);
                alert('Заявката за излизане не бе успешна!');
            })
            .finally(() => {
                navigate('/');
            });
            
    }, [onLogout, navigate]);

    return null
}
