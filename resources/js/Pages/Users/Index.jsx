import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import UsersCreateModal from "@/Components/Users/UsersCreateModal";
import UsersEditModal from "@/Components/Users/UsersEditModal";
import { useState, useEffect } from "react";
import useToasts from "@/Hooks/Toasts";
import { Inertia } from "@inertiajs/inertia";

export default function Users({ auth, users }) {
    const [user, setUser] = useState(() => {
        return users.data ? users.data[0] : null;
    });

    const { prompt, info } = useToasts();

    const onUserSelect = (user) => {
        prompt(
            "¿Desea dar de baja a este Usuario?",
            "No podrá revertir esta acción"
        ).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route("users.destroy", user.id), {
                    onSuccess: () => {
                        info("Usuario dado de baja");
                    },
                });
            }
        });
    };

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Users" />

                <div className="row">
                    <div className="col-xs-12">
                        <h1>Usuarios</h1>
                        <button
                            type="button"
                            className="btn btn-primary margin-bottom-10 waves-effect waves-light"
                            data-toggle="modal"
                            data-target="#users-create-modal"
                        >
                            Crear usuario
                        </button>
                    </div>

                    <div className="col-xs-12">
                        <div className="box-content table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>
                                                {index +
                                                    users.per_page *
                                                        (users.current_page -
                                                            1) +
                                                    1}
                                            </td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-warning btn-xs"
                                                    onClick={() => {
                                                        setUser(user);
                                                    }}
                                                    data-toggle="modal"
                                                    data-target="#users-edit-modal"
                                                >
                                                    <i className="fa fa-pencil" />
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-xs"
                                                    onClick={() => {
                                                        onUserSelect(user);
                                                    }}
                                                >
                                                    <i className="fa fa-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Pagination
                                prev_page_url={users.prev_page_url}
                                next_page_url={users.next_page_url}
                                current_page={users.current_page}
                                last_page={users.last_page}
                                total={users.total}
                                per_page={users.per_page}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <UsersCreateModal />
            <UsersEditModal user={user} />
        </>
    );
}
