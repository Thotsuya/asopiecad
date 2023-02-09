import useBenefitiaries from '@/Hooks/Benefitiaries'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import { useEffect } from 'react'
import FormTabs from '@/Pages/Beneficiares/Partials/FormTabs'
import FormTabContent from '@/Pages/Beneficiares/Partials/FormTabContent'
import LargeInput from '@/Pages/Forms/Fields/LargeInput'
import CheckboxInput from '@/Pages/Forms/Fields/CheckboxInput'
import SelectInput from '@/Pages/Forms/Fields/SelectInput'
import RadioInput from '@/Pages/Forms/Fields/RadioInput'
import SmallInput from '@/Pages/Forms/Fields/SmallInput'

export default function Edit({
    auth,
    forms,
    project,
    beneficiary = null,
    programs,
}) {
    const { data, setData, errors, handleSubmitUpdate, isDirty, processing } =
        useBenefitiaries(forms, false, project, beneficiary, programs)

    useEffect(() => {
        Object.keys(beneficiary.beneficiary_data).forEach((key) => {
            setData((data) => ({
                ...data,
                [key]: beneficiary.beneficiary_data[key] ?? data[key],
            }))
        })
        // Set isDirty to false to avoid showing the alert when the page loads
    }, [])

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Editar Beneficiario" />

            <h1 className="page-title">
                Editar Beneficiario Proyecto: <b>{project.project_name}</b>
            </h1>

            <div className="row">
                <div
                    className={`col-xs-12 form-group ${
                        errors.name ? 'has-error' : ''
                    }`}
                >
                    <h3 className="page-title">Beneficiario:</h3>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={data.name}
                        onChange={(e) =>
                            setData((data) => ({
                                ...data,
                                name: e.target.value,
                            }))
                        }
                    />
                    {errors.name && (
                        <span className="help-block">{errors.name}</span>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 margin-top-10">
                    {isDirty && (
                        <div className="alert alert-warning">
                            <p>
                                <i className="fa fa-exclamation-triangle"></i>{' '}
                                Hay cambios sin guardar, guardalos antes de
                                salir de la página para evitar perderlos.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {forms.map((form) => (
                <div key={form.form_slug} className="row">
                    <div className="col-xs-12">
                        <div className="box-content">
                            <h4 className="box-title">{form.form_name}</h4>
                            <FormTabs form={form} />
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
                                                                        values
                                                                    ) => {
                                                                        setData(
                                                                            `${field.slug}-${form.form_slug}-${form.id}`,
                                                                            values
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
                        onClick={handleSubmitUpdate}
                        disabled={processing}
                    >
                        {processing ? (
                            <span>
                                <i className="fa fa-spinner fa-spin"></i>{' '}
                                Guardando cambios
                            </span>
                        ) : (
                            'Guardar cambios en el formulario'
                        )}
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
