import Pagination from '@/Components/Pagination'
import { Link } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'
import { Inertia } from '@inertiajs/inertia'

export default function ProjectBeneficiaries({
    beneficiaries = [],
    project,
    onBeneficiarySelected,
}) {
    const { promptWithInput, info } = useToasts()

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
                                                                Registrar visita
                                                            </a>
                                                        </li>
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
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            {project['can'][
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
