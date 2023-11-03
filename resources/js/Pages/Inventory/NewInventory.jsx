import {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";
import FormTabs from "@/Pages/Beneficiares/Partials/FormTabs";
import FormTabContent from "@/Pages/Beneficiares/Partials/FormTabContent";
import LargeInput from "@/Pages/Forms/Fields/LargeInput";
import CheckboxInput from "@/Pages/Forms/Fields/CheckboxInput";
import SelectInput from "@/Pages/Forms/Fields/SelectInput";
import RadioInput from "@/Pages/Forms/Fields/RadioInput";
import SmallInput from "@/Pages/Forms/Fields/SmallInput";

export default function NewInventory({form,data,setData,errors}) {

    return (
        <>
            <div className="row">
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
                                            key={`${form.form_slug}-${index}-tab-content`}
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
                                                                key={index + 'large-input'}
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
                                                                key={index + 'checkbox-input'}
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
                                                                key={index + 'select-input'}
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
                                                                key={index + 'select-input-multiple'}
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
                                                                key={index + 'radio-input'}
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
                                                            key={index + 'small-input'}
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
        </>
    )
}
