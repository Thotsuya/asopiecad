import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Forms(props) {
    return (
        <AuthenticatedLayout auth={props.auth}>
            <Head title="Formularios" />

            <div className="prj-header margin-bottom-30">
                <Link
                    href={route("forms.create")}
                    className="btn btn-info btn-submit-prj btn-sm waves-effect waves-light"
                >
                    Nuevo Formulario
                </Link>
                <div className="result-count">130 Projects</div>
            </div>

            <div className="col-lg-12">
                <div className="box-content">
                    <table className="table table-hover table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre del Formulario</th>
                                <th>Campos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.forms.map((form) => (
                                <tr key={form.id}>
                                    <td>{form.id}</td>
                                    <td>{form.form_name}</td>
                                    <td>{form.fields_count}</td>
                                    <td>
                                        <Link
                                            href={route("forms.edit", form.id)}
                                            className="btn btn-info btn-sm waves-effect waves-light"
                                        >
                                            <i className="fa fa-pencil" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {!props.forms.length && (
                                <tr>
                                    <td colSpan="4">
                                        <div className="alert alert-info">
                                            No hay formularios creados
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
