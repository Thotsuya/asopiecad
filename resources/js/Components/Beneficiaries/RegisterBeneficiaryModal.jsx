import { useForm } from '@inertiajs/inertia-react'
import useSelect from '@/Hooks/Select'
import { useEffect } from 'react'
import useToasts from '@/Hooks/Toasts'

export default function RegisterBeneficiaryModal({
    projects,
    forms,
    beneficiaries,
}) {
    const { data, setData, post, get, processing, errors, reset } = useForm({
        beneficiary_id: beneficiaries[0] ? beneficiaries[0].id : '',
        beneficiary_name: '',
        is_new_beneficiary: false,
        project_id: projects[0] ? projects[0].id : '',
        data_only: false,
        forms: [],
    })

    const { success, error } = useToasts()

    const onFormSelect = (form) => {
        setData('forms', [...data.forms, parseInt(form)])
    }

    const onFormRemove = (form) => {
        setData(
            'forms',
            data.forms.filter((f) => f !== parseInt(form))
        )
    }

    useSelect({
        el: '.select2',
        onChange: (form) => {
            onFormSelect(form)
        },
        onRemove: (form) => {
            onFormRemove(form)
        },
        placeholder: 'Selecciona uno o más formularios',
        selected: data.forms ? data.forms : [],
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        get(route('beneficiaries.create'), {
            preserveScroll: true,
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
                            Registrar Beneficiario <i className="fa fa-flag" />
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
                                        Beneficiarios Existentes
                                    </label>
                                    <select
                                        className="form-control"
                                        id="beneficiary"
                                        name="beneficiary"
                                        disabled={
                                            data.is_new_beneficiary ||
                                            beneficiaries.length === 0
                                        }
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                beneficiary_id: e.target.value,
                                            })
                                        }}
                                    >
                                        {beneficiaries.map((beneficiary) => (
                                            <option
                                                key={beneficiary.id}
                                                value={beneficiary.id}
                                            >
                                                {beneficiary.name}
                                            </option>
                                        ))}
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
                            <div className="col-xs-12">
                                <div
                                    className={`form-group ${
                                        errors.project_id ? 'has-error' : ''
                                    }`}
                                >
                                    <label htmlFor="project">Proyecto</label>
                                    <select
                                        className="form-control"
                                        id="project"
                                        name="project"
                                        onChange={(e) => {
                                            setData(
                                                'project_id',
                                                e.target.value
                                            )
                                        }}
                                        value={data.project_id}
                                        disabled={
                                            projects.length === 0 ||
                                            data.data_only
                                        }
                                    >
                                        {projects.map((project) => (
                                            <option
                                                key={project.id}
                                                value={project.id}
                                            >
                                                {project.project_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        id="data_only"
                                        name="data_only"
                                        checked={data.data_only}
                                        onChange={() => {
                                            setData((data) => ({
                                                ...data,
                                                data_only: !data.data_only,
                                                project_id: data.data_only
                                                    ? projects[0]
                                                        ? projects[0].id
                                                        : ''
                                                    : '',
                                            }))
                                        }}
                                    />
                                    <label htmlFor="data_only">
                                        Registrar solo información
                                    </label>
                                </div>

                                {data.data_only && (
                                    <div
                                        className={`form-group ${
                                            errors.forms ? 'has-error' : ''
                                        }`}
                                    >
                                        <label htmlFor="forms">
                                            Formularios
                                        </label>

                                        <select
                                            className="form-control select2"
                                            id="forms"
                                            name="forms"
                                        >
                                            {forms.map((form) => (
                                                <option
                                                    key={form.id}
                                                    value={form.id}
                                                >
                                                    {form.form_name}
                                                </option>
                                            ))}
                                        </select>
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
                            disabled={processing}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}