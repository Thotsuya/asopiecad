import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'
import Select from 'react-select'
import { useState, useEffect } from 'react'

export default function BeneficiaryCreateModal({ project, beneficiaries }) {
    const [programs, setPrograms] = useState([])
    const { success, error } = useToasts()

    const { data, setData, get, processing, errors, reset, wasSuccessful } =
        useForm({
            beneficiary_id: beneficiaries[0] ? beneficiaries[0].id : '',
            beneficiary_name: '',
            is_new_beneficiary: false,
            forms: [],
            programs: [],
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

    useEffect(() => {
        setPrograms(() => {
            return project.programs.map((program) => {
                return {
                    value: program.id,
                    label: program.program_name,
                }
            })
        })
    }, [])

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
                                        Beneficiarios Registrados
                                    </label>
                                    <Select
                                        id="beneficiary_id"
                                        name="beneficiary_id"
                                        placeholder="Seleccione un beneficiario"
                                        disabled={data.is_new_beneficiary}
                                        noOptionsMessage={() =>
                                            'No hay beneficiarios disponibles'
                                        }
                                        options={beneficiaries.map(
                                            (beneficiary) => {
                                                return {
                                                    value: beneficiary.id,
                                                    label: beneficiary.name,
                                                }
                                            }
                                        )}
                                        isSearchable
                                        isDisabled={
                                            beneficiaries.length === 0 ||
                                            data.is_new_beneficiary
                                        }
                                        onChange={(option) => {
                                            setData((data) => ({
                                                ...data,
                                                beneficiary_id: option.value,
                                                beneficiary_name: option.label,
                                            }))
                                        }}
                                    />
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
                                                setData((data) => ({
                                                    ...data,
                                                    is_new_beneficiary:
                                                        !data.is_new_beneficiary,
                                                    beneficiary_id:
                                                        data.is_new_beneficiary
                                                            ? beneficiaries[0]
                                                                ? beneficiaries[0]
                                                                      .id
                                                                : ''
                                                            : '',
                                                }))
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
                                        />
                                        {errors.beneficiary_name && (
                                            <span className="help-block">
                                                {errors.beneficiary_name}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="programs">
                                        Selecionar Programas
                                    </label>
                                    <Select
                                        options={programs}
                                        isMulti
                                        placeholder="Programas"
                                        isSearchable
                                        closeMenuOnSelect={false}
                                        noOptionsMessage={() =>
                                            'No hay opciones'
                                        }
                                        onChange={(options) => {
                                            setData(
                                                'forms',
                                                options.map(
                                                    (option) => option.value
                                                )
                                            )
                                        }}
                                    />
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
