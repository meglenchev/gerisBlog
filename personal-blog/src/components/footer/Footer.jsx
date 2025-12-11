import { Link } from "react-router";
import { useFetch } from "../hooks/useFetch.js";
import { endPoints } from "../../utils/endpoints.js";

export function Footer() {
    const { data } = useFetch(endPoints.social, []);

    return (
        <footer>
            <div className="footer-top">
                <img src="/images/strateva-bw.png" className="footer-logo" alt="Стратева" />
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
                </ul>
            </div>
            <div className="footer-bottom">
                {!data.length
                    ? <span>your-email@gmail.com</span>
                    : <Link to={`email: ${data[0].email}`}>{data[0].email}</Link>
                }
            </div>
        </footer>
    )
}