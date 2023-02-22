import useToasts from '@/Hooks/Toasts'
import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'

export default function ProgramShowModal({ program }) {
    const { success, error, prompt } = useToasts()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const handleRemove = (beneficiary_id) => {
        prompt(
            '¿Deseas remover al beneficiario del programa?',
            'Esta acción no se puede deshacer'
        ).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(
                    route('programs.beneficiaries.remove', program.id),
                    {
                        beneficiary_id,
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        onBefore: () => setLoading(true),
                        onFinish: () => {
                            $('#modal-program-beneficiaries').modal('hide')
                            setLoading(false)
                        },
                        onSuccess: () => {
                            success('Beneficiario removido del programa')
                        },
                        onError: (err) => {
                            error(
                                'No se pudo remover al beneficiario del programa'
                            )
                        },
                    }
                )
            }
        })
    }

    return (
        <div
            className="modal fade"
            id="modal-program-beneficiaries"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-program-beneficiaries-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-add-beneficiary-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-add-beneficiary-label"
                        >
                            <strong>{program?.program_name}</strong>
                        </h4>
                    </div>

                    <div className="modal-body">
                        {program && (
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="search">
                                            Buscar Beneficiario
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="search"
                                            name="search"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">
                                                        Beneficiario
                                                    </th>
                                                    <th className="text-center">
                                                        Fecha de registro
                                                    </th>
                                                    <th className="text-center">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {program.beneficiaries
                                                    .filter((beneficiary) => {
                                                        return beneficiary.name
                                                            .toLowerCase()
                                                            .includes(
                                                                search.toLowerCase()
                                                            )
                                                    })
                                                    .map((beneficiary) => (
                                                        <tr
                                                            key={beneficiary.id}
                                                        >
                                                            <td className="text-center">
                                                                {
                                                                    beneficiary.name
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                {
                                                                    beneficiary.created_at
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                <button
                                                                    className="btn btn-danger btn-xs"
                                                                    onClick={() => {
                                                                        handleRemove(
                                                                            beneficiary.id
                                                                        )
                                                                    }}
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                >
                                                                    <i className="fa fa-times" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
