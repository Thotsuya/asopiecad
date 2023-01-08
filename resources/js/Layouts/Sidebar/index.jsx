import { Link } from "@inertiajs/inertia-react";

export default function Sidebar({ auth }) {
    return (
        <div className="main-menu">
            <header className="header">
                <a href="index.html" className="logo">
                    <i className="ico ti-desktop" />
                    Asopiecad
                </a>
                <button
                    type="button"
                    className="button-close fa fa-times js__menu_close"
                />
            </header>
            <div className="content">
                <div className="navigation">
                    <h5 className="title">
                        Hola, <strong>{auth.user.name}</strong>
                    </h5>
                    <ul className="menu js__accordion">
                        <li
                            className={
                                route().current("dashboard") ? "current" : ""
                            }
                        >
                            <Link
                                href={route("dashboard")}
                                className="waves-effect"
                            >
                                <i className="menu-icon ti-dashboard" />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li
                            className={
                                route().current("forms.*") ? "current" : ""
                            }
                        >
                            <Link
                                href={route("forms.index")}
                                className="waves-effect"
                            >
                                <i className="menu-icon ti-agenda"></i>
                                <span>Formularios</span>
                            </Link>
                        </li>
                        <li
                            className={
                                route().current("projects.*") ? "current" : ""
                            }
                        >
                            <Link
                                href={route("projects.index")}
                                className="waves-effect"
                            >
                                <i className="menu-icon ti-clipboard"></i>
                                <span>Proyectos</span>
                            </Link>
                        </li>
                        <h5 className="title">
                            Administración <strong>General</strong>
                        </h5>
                        <li
                            className={
                                route().current("users.*") ? "current" : ""
                            }
                        >
                            <Link
                                href={route("users.index")}
                                className="waves-effect"
                            >
                                <i className="menu-icon ti-user"></i>
                                <span>Usuarios</span>
                            </Link>
                        </li>
                        <li
                            className={
                                route().current("roles.*") ? "current" : ""
                            }
                        >
                            <Link
                                href={route("roles.index")}
                                className="waves-effect"
                            >
                                <i className="menu-icon ti-lock"></i>
                                <span>Roles</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
