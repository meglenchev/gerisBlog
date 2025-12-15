import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { useFetch } from "../../hooks/useFetch.js";

export function AboutAuthor() {
    useEffect(() => {
        document.title = 'За мен';
    }, []);
    
    const { isAuthenticated, settingsId } = useContext(UserContext);

    const fetchUrl = settingsId ? endPoints.homeSettings(settingsId) : null;

    const { data, isPending } = useFetch(fetchUrl, {});

    return (
        <article className="about-author">
            {isPending
                ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                : Object.keys(data).length > 0
                    ? <>
                        <img src={data.aboutImage} alt={data.name} />
                        <h2>За автора</h2>
                        <blockquote>{data.slogan}</blockquote>
                        <p>{data.summary}</p>
                        <p>{data.info}</p>
                        {isAuthenticated && <div className="post-footer"><Link to={'/user/edit/settings'} className="btn btn-edit right" title="Редактирай информацията">Редактирай</Link></div>}
                    </>
                    : <p className="no-articles">Няма добавена информация!</p>
            }
        </article>
    )
}