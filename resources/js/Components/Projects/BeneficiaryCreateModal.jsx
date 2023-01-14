import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function BeneficiaryCreateModal({ project }) {
    const { success, error } = useToasts()

    const { data, setData, get, processing, errors, reset, wasSuccessful } =
        useForm({
            beneficiary_id: null,
            beneficiary_name: '',
            is_new_beneficiary: false,
        })

    const handleSubmit = () => {
        get(route('projects.forms.create', project.uuid), {
            onSuccess: () => {
                document
                    .getElementById('modal-register-beneficiary-close')
                    .click()
            },
            onError: (err) => {
                let firstError = Object.values(err)[0]
                error(firstError)
            },
            preserveState: true,
        })
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
                                <div
                                    className={`form-group ${
                                        errors.beneficiary_id ? 'has-error' : ''
                                    }`}
                                >
                                    <label htmlFor="name">
                                        Beneficiarios Existentes que no
                                        pertenecen a este proyecto
                                    </label>
                                    <select
                                        className="form-control"
                                        id="beneficiary"
                                        name="beneficiary"
                                        disabled={data.is_new_beneficiary}
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
                                    {errors.beneficiary_id && (
                                        <span className="help-block">
                                            {errors.beneficiary_id}
                                        </span>
                                    )}
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="is_new_beneficiary"
                                            name="is_new_beneficiary"
                                            checked={data.is_new_beneficiary}
                                            onChange={() => {
                                                setData(
                                                    'is_new_beneficiary',
                                                    !data.is_new_beneficiary
                                                )
                                            }}
                                        />
                                        <label htmlFor="is_new_beneficiary">
                                            Registrar nuevo beneficiario
                                        </label>
                                    </div>
                                </div>
                                {data.is_new_beneficiary && (
                                    <div
                                        className={`form-group ${
                                            errors.beneficiary_name
                                                ? 'has-error'
                                                : ''
                                        }`}
                                    >
                                        <label htmlFor="name">
                                            Nombre del Beneficiario
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="beneficiary_name"
                                            name="beneficiary_name"
                                            value={data.beneficiary_name}
                                            onChange={(e) =>
                                                setData(
                                                    'beneficiary_name',
                                                    e.target.value
                                                )
                                            }
                                            disabled={!data.is_new_beneficiary}
                                        />
                                        {errors.beneficiary_name && (
                                            <span className="help-block">
                                                {errors.beneficiary_name}
                                            </span>
                                        )}
                                    </div>
                                )}
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
