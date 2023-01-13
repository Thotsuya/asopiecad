import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
import useBenefitiaries from '@/Hooks/Benefitiaries'
import FormTabs from '@/Pages/Beneficiares/Partials/FormTabs'
import FormTabContent from '@/Pages/Beneficiares/Partials/FormTabContent'
import LargeInput from '@/Pages/Forms/Fields/LargeInput'
import CheckboxInput from '@/Pages/Forms/Fields/CheckboxInput'
import SelectInput from '@/Pages/Forms/Fields/SelectInput'
import RadioInput from '@/Pages/Forms/Fields/RadioInput'
import SmallInput from '@/Pages/Forms/Fields/SmallInput'
import { useEffect } from 'react'

export default function Create({ auth, forms, project, is_new }) {
    const { data, setData, errors, handleSubmit } = useBenefitiaries(
        forms,
        is_new,
        project
    )

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Registrar Beneficiario" />

            <h1 className="page-title">
                {is_new ? 'Registrar Beneficiario' : 'Editar Beneficiario'} en
                Proyecto: <b>{project.project_name}</b>
            </h1>

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
                                                                        e
                                                                    ) => {
                                                                        // Push or remove from array
                                                                        setData(
                                                                            `${field.slug}-${form.form_slug}-${form.id}`,
                                                                            Object.values(
                                                                                e
                                                                                    .target
                                                                                    .selectedOptions
                                                                            ).map(
                                                                                (
                                                                                    option
                                                                                ) => {
                                                                                    return option.value
                                                                                }
                                                                            )
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
                    >
                        Guardar Beneficiario
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
