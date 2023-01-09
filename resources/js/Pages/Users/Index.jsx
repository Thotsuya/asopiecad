import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import UsersCreateModal from "@/Components/Users/UsersCreateModal";

export default function Users({ auth, users }) {
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
                        <div className="box-content">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Pagination
                                prev_page_url={users.prev_page_url}
                                next_page_url={users.next_page_url}
                                current_page={users.current_page}
                                last_page={users.last_page}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <UsersCreateModal />
        </>
    );
}
