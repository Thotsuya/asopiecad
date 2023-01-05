import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Login" />
            <div id="single-wrapper">
                <form action="#" className="frm-single">
                    <div className="inside">
                        <div className="title">
                            <strong>Asopiecad</strong>
                        </div>
                        <div className="frm-title">Inicio de Sesión</div>
                        <div className="frm-input">
                            <input
                                type="text"
                                placeholder="email"
                                name="email"
                                className="frm-inp"
                                onChange={onHandleChange}
                            />
                            <i className="fa fa-user frm-ico" />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="frm-input">
                            <input
                                type="password"
                                placeholder="contraseña"
                                className="frm-inp"
                                name="password"
                                onChange={onHandleChange}
                            />
                            <i className="fa fa-lock frm-ico" />
                            {errors.password && (
                                <span className="text-danger">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="clearfix margin-bottom-20">
                            <div className="pull-left">
                                <div className="checkbox primary">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        onClick={onHandleChange}
                                    />
                                    <label htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="frm-submit"
                            onClick={submit}
                        >
                            Iniciar Sesión
                            <i className="fa fa-arrow-circle-right" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
