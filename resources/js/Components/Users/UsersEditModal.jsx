import { useForm } from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";
import { useEffect } from "react";

export default function UsersEditModal({ user }) {
    const { data, setData, put, processing, errors, reset, transform } =
        useForm({
            id: user.id,
            name: user.name,
            email: user.email,
            password: "",
            password_confirmation: "",
        });

    const { success, error } = useToasts();

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("users.update", user.id), {
            onSuccess: () => {
                success("Usuario actualizado correctamente");
                document.getElementById("users-edit-modal-close").click();
            },
            onError: () => {
                error("Error al actualizar usuario");
            },
        });
    };

    useEffect(() => {
        setData((data) => ({
            ...data,
            id: user.id,
            name: user.name,
            email: user.email,
        }));
    }, [user]);

    return (
        <div
            className="modal fade"
            id="users-edit-modal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="users-edit-modal-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="users-edit-modal-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title" id="users-edit-modal-label">
                            Editar Usuario
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div
                                className={`col-xs-12 ${
                                    errors.name ? "has-error" : ""
                                }`}
                            >
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    id="name_edit"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData("name", e.target.value);
                                    }}
                                />
                                {errors.name && (
                                    <span className="help-block">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`col-xs-12 form-group margin-top-15 ${
                                    errors.email ? "has-error" : ""
                                } `}
                            >
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    id="email_edit"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData("email", e.target.value);
                                    }}
                                />
                                {errors.email && (
                                    <span className="help-block">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`col-xs-12 form-group margin-top-15 ${
                                    errors.password ? "has-error" : ""
                                } `}
                            >
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    id="password_edit"
                                    name="password"
                                    onChange={(e) => {
                                        setData("password", e.target.value);
                                    }}
                                />
                                {errors.password && (
                                    <span className="help-block">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`col-xs-12 form-group margin-top-15 ${
                                    errors.password ? "has-error" : ""
                                } `}
                            >
                                <label htmlFor="password_confirmation">
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmar contraseña"
                                    id="password_confirmation_edit"
                                    name="password_confirmation"
                                    onChange={(e) => {
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            disabled={processing}
                            onClick={handleSubmit}
                        >
                            {processing ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
