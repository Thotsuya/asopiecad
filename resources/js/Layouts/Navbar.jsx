import { Inertia } from "@inertiajs/inertia";

export default function Navbar({ auth }) {
    const timeAwareGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 6 && hour < 12) {
            return "Buenos días";
        } else if (hour >= 12 && hour < 18) {
            return "Buenas tardes";
        } else {
            return "Buenas noches";
        }
    };

    const handleSidebar = () => {
        document.querySelector("html").classList.toggle("menu-active");
        window.dispatchEvent(new Event("resize"));

        document
            .querySelector(".js__menu_close")
            .addEventListener("click", function () {
                document.querySelector("html").classList.remove("menu-active");
            });

        document
            .querySelector("body")
            .addEventListener("click", function (event) {
                if (
                    document.querySelector("html.menu-active") &&
                    window.innerWidth < 800
                ) {
                    let selector = event.target;
                    if (
                        !(
                            selector.classList.contains("main-menu") ||
                            selector.classList.contains("js__menu_mobile") ||
                            selector.parentNode.classList.contains(
                                "main-menu"
                            ) ||
                            selector.parentNode.classList.contains(
                                "js__menu_mobile"
                            )
                        )
                    ) {
                        document
                            .querySelector("html")
                            .classList.remove("menu-active");
                    }
                }
            });
    };

    const handleLogout = () => {
        Inertia.post(route("logout"));
    };

    return (
        <div className="fixed-navbar">
            <div className="pull-left">
                <button
                    onClick={handleSidebar}
                    type="button"
                    className="menu-mobile-button glyphicon glyphicon-menu-hamburger js__menu_mobile"
                />
                <h1 className="page-title">
                    {timeAwareGreeting()} <strong>{auth.user.name}</strong>!
                </h1>
            </div>
            <div className="pull-right">
                <a
                    href="#"
                    className="ico-item ti-bell notice-alarm js__toggle_open"
                    data-target="#notification-popup"
                />
                <div className="ico-item">
                    <i className="ti-user" />
                    <ul className="sub-ico-item">
                        <li>
                            <a href="#">Mi Perfil</a>
                        </li>
                        <li>
                            <a href="#" onClick={handleLogout}>
                                Cerrar Sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
