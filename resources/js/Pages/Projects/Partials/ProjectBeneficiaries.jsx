import Pagination from '@/Components/Pagination'
import { Link } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'
import { Inertia } from '@inertiajs/inertia'

export default function ProjectBeneficiaries({
    beneficiaries = [],
    project,
    onBeneficiarySelected,
    auth,
}) {
    const { promptWithInput, info, prompt, error } = useToasts()

    const handleDelete = (beneficiary) => {
        promptWithInput(
            `¿Está seguro de eliminar el beneficiario ${beneficiary.name}?`,
            `Esta acción no se puede deshacer. Debe ingresar el motivo de la eliminación para continuar.`,
            {
                input: 'text',
                inputLabel: 'Motivo de eliminación',
                inputPlaceholder: 'Motivo de eliminación',
                required: true,
            },
            'Debe ingresar el motivo de la eliminación para continuar.'
        ).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(
                    route('projects.forms.destroy', {
                        project: project.uuid,
                        beneficiary: beneficiary.uuid,
                    }),
                    {
                        preserveScroll: true,
                        data: {
                            deletion_reason: result.value,
                        },
                        onSuccess: () => {
                            info('Beneficiario eliminado correctamente')
                        },
                    }
                )
            }
        })
    }

    const handleApprove = (beneficiary) => {
        prompt(
            '¿Está seguro de aprobar el beneficiario?',
            'Esta acción no se puede deshacer. Revisa que los datos sean correctos antes de continuar.'
        ).then((result) => {
            if (result.isConfirmed) {
                Inertia.patch(
                    route('projects.forms.approve', {
                        project: project.uuid,
                        beneficiary: beneficiary.uuid,
                    }),
                    {},
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            info('Beneficiario aprobado correctamente')
                        },
                        onError: () => {
                            error('Error al aprobar el beneficiario')
                        },
                        preserveState: true,
                    }
                )
            }
        })
    }

    return (
        <div
            className="tab-pane fade"
            role="tabpanel"
            id="beneficiaries"
            aria-labelledby="profile-tab"
        >
            <div className="row">
                <div className="col-xs-12 table-responsive">
                    {beneficiaries.data.length > 0 ? (
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Código Interno</th>
                                    <th>Programas</th>
                                    <th>Última visita</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {beneficiaries.data.map(
                                    (beneficiary, index) => (
                                        <tr key={beneficiary.uuid}>
                                            <th>
                                                {index *
                                                    beneficiaries.current_page +
                                                    1}
                                            </th>
                                            <td>{beneficiary.name}</td>
                                            <td>{beneficiary.internal_id}</td>
                                            <td>
                                                {beneficiary.programs.length >
                                                0 ? (
                                                    <></>
                                                ) : (
                                                    'No hay programas registrados'
                                                )}
                                            </td>
                                            <td>
                                                {!beneficiary.last_visited_at ? (
                                                    <span className="label label-danger">
                                                        No hay visitas
                                                        registradas
                                                    </span>
                                                ) : (
                                                    beneficiary.last_visited_at
                                                )}
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge bg-${beneficiary.badge}`}
                                                >
                                                    {
                                                        beneficiary.internal_status
                                                    }
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-default btn-sm dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Acciones{' '}
                                                        <span className="caret" />
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        {project.can[
                                                            'register-appointments'
                                                        ] &&
                                                            !beneficiary.is_trashed && (
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => {
                                                                            onBeneficiarySelected(
                                                                                beneficiary
                                                                            )
                                                                        }}
                                                                        data-toggle="modal"
                                                                        data-target="#modal-register-appointment"
                                                                    >
                                                                        Registrar
                                                                        visita
                                                                    </a>
                                                                </li>
                                                            )}
                                                        {project.can[
                                                            'edit-beneficiary'
                                                        ] &&
                                                            !beneficiary.is_trashed && (
                                                                <li>
                                                                    <Link
                                                                        href={route(
                                                                            'projects.forms.edit',
                                                                            {
                                                                                project:
                                                                                    project.uuid,
                                                                                beneficiary:
                                                                                    beneficiary.uuid,
                                                                            }
                                                                        )}
                                                                    >
                                                                        Editar
                                                                        Información
                                                                    </Link>
                                                                </li>
                                                            )}

                                                        {project.can[
                                                            'delete-beneficiary'
                                                        ] &&
                                                            !beneficiary.is_trashed && (
                                                                <li>
                                                                    {project[
                                                                        'can'
                                                                    ][
                                                                        'delete-beneficiary'
                                                                    ] && (
                                                                        <a
                                                                            href="#"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    beneficiary
                                                                                )
                                                                            }
                                                                        >
                                                                            Eliminar
                                                                        </a>
                                                                    )}
                                                                </li>
                                                            )}
                                                        {project.can[
                                                            'approve-beneficiary'
                                                        ] &&
                                                            !beneficiary.is_trashed &&
                                                            !beneficiary.is_approved && (
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() =>
                                                                            handleApprove(
                                                                                beneficiary
                                                                            )
                                                                        }
                                                                    >
                                                                        Aprobar
                                                                    </a>
                                                                </li>
                                                            )}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info">
                            No hay beneficiarios registrados en este proyecto.
                        </div>
                    )}
                    <Pagination
                        current_page={beneficiaries.current_page}
                        next_page_url={beneficiaries.next_page_url}
                        per_page={beneficiaries.per_page}
                        total={beneficiaries.total}
                        last_page={beneficiaries.last_page}
                        prev_page_url={beneficiaries.prev_page_url}
                    />
                </div>
            </div>
        </div>
    )
}
