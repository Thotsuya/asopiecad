import {Head, Link} from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import RegisterBeneficiaryModal from '@/Components/Beneficiaries/RegisterBeneficiaryModal'
import Pagination from '@/Components/Pagination'
import {useState} from 'react'
import BeneficiaryProjectModal from '@/Components/Beneficiaries/BeneficiaryProjectModal'
import useUsers from '@/Hooks/Users'
import Filters from '@/Pages/Beneficiares/Partials/Filters'
import useToasts from '@/Hooks/Toasts'
import {Inertia} from '@inertiajs/inertia'
import BeneficiaryList from "@/Components/Beneficiaries/BeneficiaryList";
import {createFilter} from "react-select";
import AsyncSelect from "react-select/async";

export default function Index({
                                  beneficiaries_paginated,
                                  beneficiaries,
                                  projects,
                                  forms,
                                  auth
                              }) {


    const [beneficiary, setBeneficiary] = useState(null)

    const {can} = useUsers()

    const {success, error, prompt} = useToasts()

    const handleApprove = (beneficiary) => {
        prompt(
            '¿Estás seguro de aprobar este beneficiario?',
            'Antes de aprobar al beneficiario, asegúrate de que todos los datos estén correctos.'
        ).then((result) => {
            if (result.value) {
                Inertia.patch(
                    route('beneficiaries.approve', beneficiary.uuid),
                    {},
                    {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            success('El participante ha sido aprobado.')
                        },
                    }
                )
            }
        })
    }


    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Beneficiarios"/>
                <div className="prj-header margin-bottom-30">
                    {can('Registrar Beneficiarios', auth.user.abilities) && (
                        <button
                            type="button"
                            data-toggle="modal"
                            data-target="#modal-register-beneficiary"
                            className="btn btn-info btn-submit-prj btn-sm waves-effect waves-light"
                        >
                            Registrar Participante
                        </button>
                    )}
                    <div className="result-count">
                        {beneficiaries_paginated.total} Participantes
                    </div>
                </div>

                <Filters projects={projects} forms={forms}/>

                <div className="row">


                    <div className="col-xs-12">
                        <div className="box-content">
                            {beneficiaries_paginated.total === 0 && (
                                <div className="alert alert-info">
                                    No hay participantes registrados
                                </div>
                            )}

                            {beneficiaries_paginated.total > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Proyectos</th>
                                            <th>Programas</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {beneficiaries_paginated.data.map(
                                            (beneficiary, index) => (
                                                <tr key={beneficiary.id}>
                                                    <td>
                                                        {
                                                            beneficiary.internal_id
                                                        }
                                                    </td>
                                                    <td>
                                                        {beneficiary.name}
                                                    </td>

                                                    <td
                                                        style={{
                                                            maxWidth: '200px',
                                                        }}
                                                    >
                                                        {/*    Show only 3, then a badge with the rest*/}
                                                        {beneficiary.projects
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    project
                                                                ) => (
                                                                    <Link
                                                                        key={
                                                                            project.id
                                                                        }
                                                                        href={route(
                                                                            'projects.show',
                                                                            project.uuid
                                                                        )}
                                                                        className="badge bg-info"
                                                                        style={{
                                                                            maxWidth: '200px',
                                                                        }}
                                                                    >
                                                                        {
                                                                            project.project_name
                                                                        }
                                                                    </Link>
                                                                )
                                                            )}
                                                        {beneficiary
                                                            .projects
                                                            .length > 3 && (
                                                            <span className="badge bg-primary">
                                                                    +
                                                                {beneficiary
                                                                        .projects
                                                                        .length -
                                                                    3}
                                                                </span>
                                                        )}
                                                        {beneficiary
                                                                .projects
                                                                .length ===
                                                            0 && (
                                                                <span className="badge bg-warning">
                                                                    No
                                                                    registrado
                                                                    en proyectos
                                                                </span>
                                                            )}
                                                    </td>
                                                    <td style={{
                                                        maxWidth: '200px',
                                                    }}>
                                                        {/*    Show only 3, then a badge with the rest*/}
                                                        {beneficiary
                                                            .programs
                                                            .slice(0, 3)
                                                            .map((program) => (
                                                                <span
                                                                    key={
                                                                        beneficiary.uuid + program.id
                                                                    }
                                                                    className={`badge bg-primary`}
                                                                    style={{
                                                                        maxWidth: '200px',
                                                                    }}
                                                                >
                                                                            {
                                                                                program.program_name
                                                                            }
                                                                        </span>
                                                            ))}

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
                                                        {!beneficiary.is_trashed && (
                                                            <>
                                                                {can(
                                                                    'Editar Beneficiarios',
                                                                    auth
                                                                        .user
                                                                        .abilities
                                                                ) && (
                                                                    <Link
                                                                        href={route(
                                                                            'beneficiaries.edit',
                                                                            beneficiary.uuid
                                                                        )}
                                                                        className="btn btn-primary btn-sm"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                )}
                                                            </>
                                                        )}
                                                        {!beneficiary.is_trashed && (
                                                            <>
                                                                {can('Ver Beneficiarios', auth.user.abilities) && (
                                                                    <Link
                                                                        href={route('beneficiaries.visits', beneficiary.uuid)}
                                                                        className="btn btn-info btn-sm">
                                                                        <i className="fa fa-calendar"></i>
                                                                    </Link>
                                                                )}
                                                            </>
                                                        )}
                                                        {!beneficiary.is_trashed &&
                                                            can(
                                                                'Aprobar Beneficiarios',
                                                                auth.user
                                                                    .abilities
                                                            ) &&
                                                            !beneficiary.is_approved && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() => {
                                                                        handleApprove(
                                                                            beneficiary
                                                                        )
                                                                    }}
                                                                    title="Aprobar"
                                                                >
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        current_page={
                                            beneficiaries_paginated.current_page
                                        }
                                        last_page={
                                            beneficiaries_paginated.last_page
                                        }
                                        total={beneficiaries_paginated.total}
                                        per_page={
                                            beneficiaries_paginated.per_page
                                        }
                                        next_page_url={
                                            beneficiaries_paginated.next_page_url
                                        }
                                        prev_page_url={
                                            beneficiaries_paginated.prev_page_url
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            <RegisterBeneficiaryModal
                beneficiaries={beneficiaries}
                forms={forms}
                projects={projects}
            />

            <BeneficiaryProjectModal
                projects={projects}
                beneficiary={beneficiary}
            />
        </>
    )
}
