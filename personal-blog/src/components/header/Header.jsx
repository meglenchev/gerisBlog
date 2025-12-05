import { NavLink } from "react-router";

export function Header() {

    return (
        <header>
            <div className="wrap">
                <div className="content">
                    <nav>
                        <ul>
                            <li><NavLink to="/">Начало</NavLink></li>
                            <li><NavLink to="/about">За мен</NavLink></li>
                            <li><NavLink to="/practices">Практики</NavLink></li>
                            <li><NavLink to="/blog">Блог</NavLink></li>

                            <li><NavLink to="/blog/create">Добави блог</NavLink></li>
                            <li><NavLink to="/practices/create">Добави практика</NavLink></li>
                            <li><NavLink to="/about/edit">Редактирай автора</NavLink></li>
                        </ul>
                    </nav>

                    <ul className="auth-nav">
                        <li><NavLink to="/user/login">Вход</NavLink></li>
                        <li><NavLink to="/user/register">Регистрация</NavLink></li>
                        <li><NavLink to="/user/logout">Изход</NavLink></li>
                    </ul>
                </div>
            </div>
            <h1><a href="/"><img src="/images/strateva.png" className="logo" alt="Стратева" /></a></h1>
        </header>
    )
}