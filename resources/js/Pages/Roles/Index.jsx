import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Dashboard({ auth, roles }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Roles" />

            <div className="row">
                <div className="col-xs-12">
                    <h1>Roles</h1>
                    <button
                        type="button"
                        className="btn btn-primary margin-bottom-10 waves-effect waves-light"
                    >
                        Crear Rol
                    </button>
                </div>

                <div className="col-xs-12">
                    <div className="box-content table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Rol</th>
                                    <th className="text-center">Permisos</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.data.map((role, index) => (
                                    <tr key={role.id}>
                                        <td className="text-center">
                                            {index +
                                                roles.per_page *
                                                    (roles.current_page - 1) +
                                                1}
                                        </td>
                                        <td className="text-center">
                                            {role.name}
                                        </td>
                                        <td className="text-center">
                                            {role.permissions
                                                .slice(0, 5)
                                                .map((permission) => (
                                                    <span
                                                        key={permission.id}
                                                        className="badge bg-primary"
                                                    >
                                                        {permission.name}
                                                    </span>
                                                ))}
                                            {role.permissions.length > 5 && (
                                                <span className="badge bg-success">
                                                    +{" "}
                                                    {role.permissions.length -
                                                        5}
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                href={route(
                                                    "roles.edit",
                                                    role.id
                                                )}
                                                className="btn btn-primary btn-xs waves-effect waves-light"
                                            >
                                                <i className="fa fa-edit" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            current_page={roles.current_page}
                            last_page={roles.last_page}
                            total={roles.total}
                            per_page={roles.per_page}
                            next_page_url={roles.next_page_url}
                            prev_page_url={roles.prev_page_url}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
