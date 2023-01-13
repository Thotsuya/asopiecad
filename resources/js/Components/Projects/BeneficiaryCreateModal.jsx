import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function BeneficiaryCreateModal({ project }) {
    const [isNewBeneficiary, setIsNewBeneficiary] = useState(false)

    const handleSubmit = () => {
        Inertia.get(
            route('projects.forms.create', project.uuid),
            {},
            {
                onBefore: () => {
                    document
                        .getElementById('modal-register-beneficiary-close')
                        .click()
                },
                onSuccess: () => {},
            }
        )
    }

    return (
        <div
            className="modal fade"
            id="modal-register-beneficiary"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-register-beneficiary-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-register-beneficiary-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-register-beneficiary-label"
                        >
                            Registrar Beneficiario
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Beneficiarios Existentes que no
                                        pertenecen a este proyecto
                                    </label>
                                    <select
                                        className="form-control"
                                        id="beneficiary"
                                        name="beneficiary"
                                        disabled={isNewBeneficiary}
                                    >
                                        <option value="0">
                                            Seleccione un beneficiario
                                        </option>
                                        <option value="1">Juan Perez</option>
                                        <option value="2">Maria Lopez</option>
                                        <option value="3">
                                            Pedro Martinez
                                        </option>
                                    </select>
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="is_new_beneficiary"
                                            name="is_new_beneficiary"
                                            checked={isNewBeneficiary}
                                            onChange={() => {
                                                setIsNewBeneficiary(
                                                    (prev) => !prev
                                                )
                                            }}
                                        />
                                        <label htmlFor="is_new_beneficiary">
                                            Registrar nuevo beneficiario
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            onClick={handleSubmit}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
