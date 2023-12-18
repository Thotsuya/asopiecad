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
import useUsers from "@/Hooks/Users";
import {Inertia} from "@inertiajs/inertia";
import useToasts from '@/Hooks/Toasts'

export default function EditDataOnly({
                                         auth,
                                         forms,
                                         is_new = false,
                                         data_only = true,
                                         beneficiary = null,
                                         previous_route
                                     }) {
    const {
        data,
        setData,
        errors,
        handleSubmitForDataOnly,
        processing,
        isDirty,
    } = useBenefitiaries(forms, is_new, _, beneficiary, previous_route)

    const {success} = useToasts()

    const {can} = useUsers()

    useEffect(() => {
        if (!is_new) {
            Object.keys(beneficiary.beneficiary_data).forEach((key) => {
                setData((data) => ({
                    ...data,
                    [key]: beneficiary.beneficiary_data[key],
                }))
            })
        }

        setData((data) => ({
            ...data,
            previous_route: previous_route
        }))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSubmitForDataOnly()
    }

    const handleSubmitAndApprove = (e) => {
        e.preventDefault()
        handleSubmitForDataOnly(true)
    }

    const handleAddConsultation = (e) => {
        e.preventDefault()
        Inertia.post(route('beneficiaries.consultations.store', beneficiary.uuid),{
            previous_route: previous_route
        },{
            preserveScroll: true,
            onSuccess: () => {
                success('Consulta agregada exitosamente')
            }
        })
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Editar Participante"/>

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
                    <div className="box-content">
                        <h3 className="page-title">
                            Cantidad de Consultas:{' '}
                            <b>{beneficiary.consultations_count}</b>
                        </h3>
                        <button
                            className="btn btn-success btn-sm pull-right"
                            onClick={handleAddConsultation}
                        >
                            <i className="fa fa-plus"></i> Agregar Consulta
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12">
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
                <div className="col-xs-6">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={handleSubmit}
                        disabled={processing}
                    >
                        {processing ? (
                            <span>
                                <i className="fa fa-spinner fa-spin"/>{' '}
                                Guardando Participante
                            </span>
                        ) : (
                            <span>Guardar Participante</span>
                        )}
                    </button>
                </div>
                {can('Aprobar Beneficiarios', auth.user.abilities) && (
                    <div className="col-xs-6">
                        <button
                            className="btn btn-success btn-block"
                            onClick={handleSubmitAndApprove}
                            disabled={processing}
                        >
                            {processing ? (
                                <span>
                                <i className="fa fa-spinner fa-spin"/>{' '}
                                    Guardando Participante
                            </span>
                            ) : (
                                <span>Guardar y Aprobar Participante</span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    )
}
