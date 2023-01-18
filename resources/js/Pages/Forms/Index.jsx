import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/inertia-react'
import useUsers from '@/Hooks/Users'

export default function Forms(props) {
    const { can } = useUsers()

    return (
        <AuthenticatedLayout auth={props.auth}>
            <Head title="Formularios" />

            <div className="prj-header margin-bottom-30">
                {can('Crear Formularios', props.auth.user.abilities) && (
                    <Link
                        href={route('forms.create')}
                        className="btn btn-info btn-submit-prj btn-sm waves-effect waves-light"
                    >
                        Nuevo Formulario
                    </Link>
                )}
                <div className="result-count">
                    {props.forms.length} Formularios
                </div>
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
                                            href={route('forms.edit', form.id)}
                                            className="btn btn-info btn-sm waves-effect waves-light"
                                            disabled={
                                                !can(
                                                    'Editar Formularios',
                                                    props.auth.user.abilities
                                                )
                                            }
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
    )
}
