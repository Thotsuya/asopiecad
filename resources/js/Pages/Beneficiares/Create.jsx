import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/inertia-react'
import useBenefitiaries from '@/Hooks/Benefitiaries'
import FormTabs from '@/Pages/Beneficiares/Partials/FormTabs'
import FormTabContent from '@/Pages/Beneficiares/Partials/FormTabContent'
import LargeInput from '@/Pages/Forms/Fields/LargeInput'
import CheckboxInput from '@/Pages/Forms/Fields/CheckboxInput'
import SelectInput from '@/Pages/Forms/Fields/SelectInput'
import RadioInput from '@/Pages/Forms/Fields/RadioInput'
import SmallInput from '@/Pages/Forms/Fields/SmallInput'
import {useEffect} from 'react'

export default function Create({
                                   auth,
                                   forms,
                                   project,
                                   programs,
                                   is_new = false,
                                   beneficiary = null,
                               }) {
    const {data, setData, errors, handleSubmit, processing,calculateSimilarity} =
        useBenefitiaries(forms, is_new, project, beneficiary, programs)

    useEffect(() => {
        if (!is_new) {
            Object.keys(beneficiary.beneficiary_data).forEach((key) => {
                setData((data) => ({
                    ...data,
                    [key]: beneficiary.beneficiary_data[key],
                }))
            })

            let newData = {...data}

            Object.keys(newData).forEach((key) => {
                // Find the fields that are empty, compare with the beneficiary data and fill them with the closest value
                if (newData[key] === null || newData[key] === '') {
                    Object.keys(beneficiary.beneficiary_data).forEach((key2) => {
                        if(calculateSimilarity(key,key2).result){
                            newData[key] = beneficiary.beneficiary_data[key2]
                        }
                    })
                }
            })

            setData(newData)
        }
    }, [])

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Registrar Participante"/>

            <h1 className="page-title">
                {is_new ? 'Registrar Participante' : 'Editar Participante'} en
                Proyecto: <b>{project.project_name}</b>
            </h1>

            <div className="row">
                <div className="col-xs-12">
                    <h3 className="page-title">
                        {is_new ? 'Nuevo Participante' : 'Participante'}:{' '}
                        <b>{data.name}</b>
                    </h3>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12">
                    <div
                        className={`alert alert-${is_new ? 'info' : 'warning'}`}
                    >
                        <p>
                            Se registrarán los datos del participante{' '}
                            {!is_new ? (
                                <strong className="text-primary">
                                    Ya existente
                                </strong>
                            ) : (
                                ''
                            )}{' '}
                            <b>{data.name}</b> en el proyecto{' '}
                            <b>{project.project_name}</b>. Verifique que los
                            datos sean correctos antes de guardar. <br/> Los
                            campos marcados con{' '}
                            <span className="text-danger">*</span> son
                            obligatorios.
                        </p>
                    </div>
                </div>
            </div>

            {forms.map((form) => (
                <div key={form.form_slug} className="row">
                    <div className="col-xs-12">
                        <div className="box-content">
                            <h4 className="box-title">{form.form_name}</h4>
                            <FormTabs form={form}/>
                            <div
                                className="tab-content"
                                id="beneficiary-form-tabs"
                            >
                                {form.tabs
                                    .sort((a, b) => a.order - b.order)
                                    .map((tab, index) => (
                                        <>
                                            <FormTabContent
                                                key={`${form.form_slug}-${index}`}
                                                tab={tab}
                                                form={form}
                                                index={index}
                                            >
                                                {tab.fields.map(
                                                    (field, index) => {
                                                        if (
                                                            field.type ===
                                                            'textarea'
                                                        ) {
                                                            return (
                                                                <LargeInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    editable={
                                                                        false
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setData(
                                                                            `${field.slug}-${form.form_slug}-${form.id}`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }}
                                                                    value={
                                                                        data[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                    error={
                                                                        errors[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                />
                                                            )
                                                        }

                                                        if (
                                                            field.type ===
                                                            'checkbox'
                                                        ) {
                                                            return (
                                                                <CheckboxInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    editable={
                                                                        false
                                                                    }
                                                                    onChange={() => {
                                                                        setData(
                                                                            `${field.slug}-${form.form_slug}-${form.id}`,
                                                                            !data[
                                                                                `${field.slug}-${form.form_slug}-${form.id}`
                                                                                ]
                                                                        )
                                                                    }}
                                                                    checked={
                                                                        data[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                    error={
                                                                        errors[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                />
                                                            )
                                                        }

                                                        if (
                                                            field.type ===
                                                            'select'
                                                        ) {
                                                            return (
                                                                <SelectInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    editable={
                                                                        false
                                                                    }
                                                                    onChange={(
                                                                        value
                                                                    ) => {
                                                                        setData(
                                                                            `${field.slug}-${form.form_slug}-${form.id}`,
                                                                            value
                                                                        )
                                                                    }}
                                                                    value={
                                                                        data[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                    error={
                                                                        errors[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                />
                                                            )
                                                        }

                                                        if (
                                                            field.type ===
                                                            'select multiple'
                                                        ) {
                                                            return (
                                                                <SelectInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    editable={
                                                                        false
                                                                    }
                                                                    onChange={(
                                                                        value
                                                                    ) => {
                                                                        // Push or remove from array
                                                                        setData(
                                                                            `${field.slug}-${form.form_slug}-${form.id}`,
                                                                            value
                                                                        )
                                                                    }}
                                                                    value={
                                                                        data[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                    error={
                                                                        errors[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                />
                                                            )
                                                        }

                                                        if (
                                                            field.type ===
                                                            'radio'
                                                        ) {
                                                            return (
                                                                <RadioInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    editable={
                                                                        false
                                                                    }
                                                                    onChange={() => {
                                                                        setData(
                                                                            `${field.slug}-${form.form_slug}-${form.id}`,
                                                                            !data[
                                                                                `${field.slug}-${form.form_slug}-${form.id}`
                                                                                ]
                                                                        )
                                                                    }}
                                                                    checked={
                                                                        data[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                    error={
                                                                        errors[
                                                                            `${field.slug}-${form.form_slug}-${form.id}`
                                                                            ]
                                                                    }
                                                                />
                                                            )
                                                        }

                                                        return (
                                                            <SmallInput
                                                                key={index}
                                                                field={field}
                                                                editable={false}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setData(
                                                                        `${field.slug}-${form.form_slug}-${form.id}`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }}
                                                                value={
                                                                    data[
                                                                        `${field.slug}-${form.form_slug}-${form.id}`
                                                                        ]
                                                                }
                                                                error={
                                                                    errors[
                                                                        `${field.slug}-${form.form_slug}-${form.id}`
                                                                        ]
                                                                }
                                                            />
                                                        )
                                                    }
                                                )}
                                            </FormTabContent>
                                        </>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="row">
                <div className="col-xs-12">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? (
                            <span>
                                <i className="fa fa-spinner fa-spin"/>{' '}
                                Guardando Beneficiario
                            </span>
                        ) : (
                            <span>Guardar Beneficiario</span>
                        )}
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
