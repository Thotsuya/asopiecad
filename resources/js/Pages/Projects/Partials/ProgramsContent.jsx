import Pagination from '@/Components/Pagination'
import ProgramBeneficiaryModal from '@/Pages/Projects/Partials/ProgramBeneficiaryModal'
import { useState } from 'react'

export default function Programs({
    programs,
    beneficiaries,
    setSelectedProgram,
}) {
    return (
        <>
            <div
                className="tab-pane fade"
                role="tabpanel"
                id="programs"
                aria-labelledby="home-tab"
            >
                <div className="row">
                    <div className="col-xs-12 table-responsive">
                        {programs.data.length > 0 ? (
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Beneficiarios</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {programs.data.map((program) => (
                                        <tr key={program.id}>
                                            <td>{program.program_name}</td>
                                            <td>
                                                {program.beneficiaries_count}
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <button
                                                        title="Ver Beneficiarios"
                                                        className="btn btn-xs btn-primary waves-effect waves-light"
                                                        data-toggle="modal"
                                                        data-target="#modal-program-beneficiaries"
                                                        onClick={() =>
                                                            setSelectedProgram(
                                                                program
                                                            )
                                                        }
                                                    >
                                                        <i className="fa fa-eye" />
                                                    </button>
                                                    <button
                                                        title="Agregar Beneficiario"
                                                        className="btn btn-xs btn-success waves-effect waves-light"
                                                        data-toggle="modal"
                                                        data-target="#modal-add-beneficiary"
                                                        onClick={() =>
                                                            setSelectedProgram(
                                                                program
                                                            )
                                                        }
                                                    >
                                                        <i className="fa fa-user-plus" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-info">
                                No hay programas registrados en este proyecto
                            </div>
                        )}
                        <Pagination
                            current_page={programs.current_page}
                            next_page_url={programs.next_page_url}
                            per_page={programs.per_page}
                            total={programs.total}
                            last_page={programs.last_page}
                            prev_page_url={programs.prev_page_url}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
