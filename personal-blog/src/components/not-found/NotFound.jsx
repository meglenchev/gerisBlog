import { Link } from "react-router";

export function NotFound() {
    return (
        <article className="not-found">
            <h2>Страницата, която търсите, не е намерена</h2>
            <p className="mb-40">Страницата, която търсите, не съществува. Възможно е да е била преместена или премахната напълно. Може би е добре да се върнете на началната страница на сайта и да видите дали можете да намерите това, което търсите.</p>
            <Link to={'/'} className="btn btn-back">началната страница</Link>
        </article>
    )
}