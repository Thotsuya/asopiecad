import { useForm } from '@inertiajs/inertia-react'
import useSelect from '@/Hooks/Select'
import useToasts from '@/Hooks/Toasts'
import Select, {createFilter} from 'react-select'
import AsyncSelect from "react-select/async";
import BeneficiaryList from "@/Components/Beneficiaries/BeneficiaryList";
import CreatableSelect from 'react-select/creatable';
import {useState} from "react";


export default function RegisterBeneficiaryModal({
    projects,
    forms,
    beneficiaries,
}) {

    const [beneficiariesOptions, setBeneficiariesOptions] = useState(beneficiaries)

    const { data, setData, post, get, processing, errors, reset } = useForm({
        beneficiary_id: beneficiaries[0] ? beneficiaries[0].id : '',
        beneficiary_name: '',
        is_new_beneficiary: false,
        project_id: projects[0] ? projects[0].id : '',
        programs: [],
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


    const handleCreate = (inputValue) => {

        // Add new beneficiary to options
        setBeneficiariesOptions((prev) => ([
            ...prev,
            {
                value: 'new ' + inputValue.toLowerCase().replace(/\W/g, ''),
                label: inputValue,
            }
        ]))
        // Set is new beneficiary to true
        setData((data) => ({
            ...data,
            is_new_beneficiary: true,
            beneficiary_id: 'new ' + inputValue.toLowerCase().replace(/\W/g, ''),
            beneficiary_name: inputValue,
        }))

    };

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
                                        Participante
                                        <br />
                                        <small className="text-primary">
                                            Puedes buscar un participante existente ( Por nombre o cédula ) o crear uno nuevo
                                        </small>
                                    </label>
                                    <CreatableSelect
                                        components={{
                                            MenuList: BeneficiaryList,
                                        }}
                                        cacheOptions
                                        defaultOptions
                                        options={beneficiariesOptions}
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        onChange={(beneficiary) => {
                                            setData((data) => {
                                                if(beneficiary) {
                                                    return {
                                                        ...data,
                                                        beneficiary_id: beneficiary.value,
                                                        beneficiary_name: beneficiary.label,
                                                        is_new_beneficiary: false,
                                                    }
                                                }

                                                return {
                                                    ...data,
                                                    beneficiary_id: '',
                                                    beneficiary_name: '',
                                                    is_new_beneficiary: false,
                                                }

                                            })
                                        }}
                                        noOptionsMessage={() => 'No hay datos'}
                                        placeholder="Selecciona , busca o crea un participante"
                                        onCreateOption={handleCreate}
                                        formatCreateLabel={(inputValue) => `Crear Participante: ${inputValue}`}
                                        isClearable
                                        value={beneficiariesOptions.find(
                                            (beneficiary) =>
                                                beneficiary.value === data.beneficiary_id
                                        )}
                                        />
                                    {errors.beneficiary_id && (
                                        <span className="help-block">
                                            {errors.beneficiary_id}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div
                                    className={`form-group ${
                                        errors.project_id ? 'has-error' : ''
                                    }`}
                                >
                                    <label htmlFor="project">Proyecto</label>
                                    <Select
                                        name="project_id"
                                        options={projects.map((project) => ({
                                            value: project.id,
                                            label: project.project_name,
                                        }))}
                                        onChange={(project) => {
                                            setData((data) => ({
                                                ...data,
                                                project_id: project.value,
                                            }))
                                        }}
                                        noOptionsMessage={() => 'No hay datos'}
                                        placeholder="Selecciona un proyecto"
                                        isDisabled={
                                            projects.length === 0 ||
                                            data.data_only
                                        }
                                    />
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

                                        <Select
                                            name="forms"
                                            options={forms.map((form) => ({
                                                value: form.id,
                                                label: form.form_name,
                                            }))}
                                            isMulti
                                            onChange={(form) => {
                                                setData((data) => ({
                                                    ...data,
                                                    forms: form.map(
                                                        (form) => form.value
                                                    ),
                                                }))
                                            }}
                                            noOptionsMessage={() =>
                                                'No hay datos'
                                            }
                                            placeholder="Selecciona un formulario"
                                            isDisabled={
                                                forms.length === 0 ||
                                                !data.data_only
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-xs-12">
                                <div
                                    className={`form-group ${
                                        errors.program_id ? 'has-error' : ''
                                    }
                                    `}
                                >
                                    <label htmlFor="program">Programa</label>
                                    <Select
                                        name="program_id"
                                        options={projects
                                            .find(
                                                (project) =>
                                                    project.id ===
                                                    data.project_id
                                            )
                                            ?.programs.map((program) => ({
                                                value: program.id,
                                                label: program.program_name,
                                            }))}
                                        isMulti
                                        onChange={(program) => {
                                            setData((data) => ({
                                                ...data,
                                                programs: program.map(
                                                    (program) => program.value
                                                ),
                                            }))
                                        }}
                                        noOptionsMessage={() => 'No hay datos'}
                                        placeholder="Selecciona un programa"
                                        isDisabled={
                                            projects.find(
                                                (project) =>
                                                    project.id ===
                                                    data.project_id
                                            )?.programs.length === 0
                                        }
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
