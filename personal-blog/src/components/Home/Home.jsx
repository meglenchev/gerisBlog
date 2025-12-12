import { Link } from "react-router";
import { LatestPosts } from "./latest-posts/LatestPosts.jsx";
import { LatestPractices } from "./latest-practices/LatestPractices.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";
import { useContext } from "react";
import UserContext from "../../context/UserContext.jsx";

export function Home() {
    const { setSettingsIdHandler } = useContext(UserContext);
    const { data, isPending } = useFetch(endPoints.homeAbout, []);

    if (!isPending && data.length > 0) {
        const settingsId = data[0]._id;
        setSettingsIdHandler(settingsId);
    }

    return (
        <main>
            <article className="header-image">
                {!data.length ?
                    <img src="https://firebasestorage.googleapis.com/v0/b/personal-blog-fadcb.firebasestorage.app/o/header-image.jpg?alt=media&token=76ae0ef2-08f0-4297-a313-93ae8a50cf1f" alt="" />
                    : <img src={data[0].headerImage} alt="Гергана Стратева" />
                }
            </article>

            <article className="quick-links">
                <section>
                    <img src="/images/praktiki.svg" alt="Предстоящи практики" />
                    <div>
                        <h2>Предстоящи практики</h2>
                        <Link to="/practices" title="виж повече">виж повече</Link>
                    </div>
                </section>
                <section>
                    <img src="/images/novo.svg" alt="Ново в блога" />
                    <div>
                        <h2>Ново в блога</h2>
                        <Link to="/blogs" title="виж повече">виж повече</Link>
                    </div>
                </section>
                <section>
                    <img src="/images/author.svg" alt="За авторката" />
                    <div>
                        <h2>За авторката</h2>
                        <Link to="/about" title="виж повече">виж повече</Link>
                    </div>
                </section>
            </article>

            <article className="wrap-section">
                <section className="about-author-short">
                    <div className="author-photo">
                        {!data.length
                            ? <img src="https://firebasestorage.googleapis.com/v0/b/personal-blog-fadcb.firebasestorage.app/o/author.jpg?alt=media&token=47068abe-1588-444b-9394-22367515a27a" alt="" />
                            : <img src={data[0].authorImage} alt="Гергана Стратева" />
                        }
                    </div>
                    <div className="author-bio">
                        <h2>{data[0]?.name}</h2>
                        <p>{data[0]?.shortInfo}</p>
                        <Link to="/about" className="btn" title="Научи повече">Научи повече</Link>
                    </div>
                </section>
                <section className="post-categories">
                    <h3>Свържете се с мен</h3>
                    <p>Оценяваме интереса ви. Това са възможните начини да се свържете с мен.</p>
                    <ul>
                        <li>
                            {!data.length
                                ? <span ><img src="/images/facebook.svg" alt="Facebook" /></span>
                                : <Link to={data[0].facebook} title="Facebook"><img src="/images/facebook.svg" alt="Facebook" /></Link>
                            }
                        </li>
                        <li>
                            {!data.length
                                ? <span><img src="/images/instagram.svg" alt="Instagram" /></span>
                                : <Link to={data[0].instagram} title="Instagram"><img src="/images/instagram.svg" alt="Instagram" /></Link>
                            }
                        </li>
                        <li>
                            {!data.length
                                ? <span><img src="/images/email.svg" alt="email" />your-email@gmail.com</span>
                                : <Link to={`email: ${data[0].email}`}><img src="/images/email.svg" alt="email" /></Link>
                            }
                        </li>
                    </ul>
                </section>
            </article>
            <LatestPosts />
            <LatestPractices />
        </main>
    )
}