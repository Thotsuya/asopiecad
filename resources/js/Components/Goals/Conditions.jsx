import Select from 'react-select'
import { useState } from 'react'
import { OPERANDS } from '@/Constants/Operators'

export default function Conditions({
    options,
    program,
    fieldIndex,
    setData,
    condition,
    handleDuplicate,
    handleRemoveCondition,
    handleNewConditionItem,
}) {
    const [forms, setForms] = useState([])
    const [counter, setCounter] = useState(0)

    const handleChange = (option, conditionIndex) => {
        let fields = program.forms.find(
            (form) => form.id === option.value
        ).fields

        let form = program.forms.find((form) => form.id === option.value)

        setForms(() => {
            return fields.map((field) => {
                return {
                    value: field.id,
                    label: field.name,
                }
            })
        })

        setData((data) => {
            data.conditions[fieldIndex].conditions[conditionIndex].form_id =
                form.id
            data.conditions[fieldIndex].conditions[conditionIndex].form_slug =
                form.form_slug

            return data
        })
    }

    const SelectFieldOptions = (form_id, field_id) => {
        let form = program.forms.find((form) => form.id === form_id).fields
        let field = form.find((field) => field.id === field_id)

        return field.options.map((option) => {
            return {
                value: option.value,
                label: option.name,
            }
        })
    }

    const handleFieldChange = (option, conditionIndex, form_id) => {
        let form = program.forms.find((form) => form.id === form_id)
        let field = form.fields.find((field) => field.id === option)

        setData((data) => {
            data.conditions[fieldIndex].conditions[conditionIndex].field_id =
                field.id
            data.conditions[fieldIndex].conditions[
                conditionIndex
            ].field_slug = `${field.slug}-${form.form_slug}-${form.id}`
            data.conditions[fieldIndex].conditions[conditionIndex].field_type =
                field.type
            data.conditions[fieldIndex].conditions[conditionIndex].field_value =
                ''

            return data
        })
        setCounter((counter) => counter + 1)
    }

    const handleOperandChange = (option, conditionIndex) => {
        setData((data) => {
            data.conditions[fieldIndex].conditions[conditionIndex].operand =
                option.value

            return data
        })

        setCounter((counter) => counter + 1)
    }

    return (
        <>
            <div className="box ">
                <div className="box-header with-border">
                    <div className="row">
                        <div className="col-xs-12 col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Etiqueta"
                                onChange={(e) => {
                                    setData((data) => {
                                        data.conditions[fieldIndex].label =
                                            e.target.value
                                        return data
                                    })
                                }}
                                defaultValue={condition.label ?? ''}
                            />
                        </div>
                        <div className="col-xs-12 col-md-3">
                            <button
                                onClick={handleNewConditionItem}
                                className="btn btn-xs btn-primary waves-effect waves-light pull-right"
                            >
                                <i className="fa fa-plus" />
                            </button>
                            <button
                                onClick={handleRemoveCondition}
                                className="btn btn-xs btn-danger pull-right"
                            >
                                <i className="fa fa-trash" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="box-content">
                    {condition.conditions &&
                        condition.conditions.map((condition, index) => (
                            <div className="row" key={index}>
                                <div className="col-xs-12 col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="goal_program">
                                            Formulario
                                        </label>
                                        <Select
                                            options={options}
                                            placeholder="Formularios"
                                            isSearchable
                                            noOptionsMessage={() =>
                                                'No hay opciones'
                                            }
                                            value={
                                                condition.form_id &&
                                                options.find(
                                                    (option) =>
                                                        option.value ===
                                                        condition.form_id
                                                )
                                            }
                                            onChange={(option) =>
                                                handleChange(option, index)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="goal_program">
                                            Campo de formulario
                                        </label>
                                        <Select
                                            options={
                                                condition.form_id
                                                    ? program.forms
                                                          .find(
                                                              (form) =>
                                                                  form.id ===
                                                                  condition.form_id
                                                          )
                                                          .fields.map(
                                                              (field) => {
                                                                  return {
                                                                      value: field.id,
                                                                      label: field.name,
                                                                  }
                                                              }
                                                          )
                                                    : []
                                            }
                                            placeholder="Campos"
                                            isSearchable
                                            noOptionsMessage={() =>
                                                'No hay opciones'
                                            }
                                            defaultValue={
                                                condition.field_id &&
                                                program.forms
                                                    .find(
                                                        (form) =>
                                                            form.id ===
                                                            condition.form_id
                                                    )
                                                    .fields.map((field) => {
                                                        return {
                                                            value: field.id,
                                                            label: field.name,
                                                        }
                                                    })
                                                    .find(
                                                        (option) =>
                                                            option.value ===
                                                            condition.field_id
                                                    )
                                            }
                                            onChange={(option) =>
                                                handleFieldChange(
                                                    option.value,
                                                    index,
                                                    condition.form_id
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="operand">
                                            Operador
                                        </label>
                                        <Select
                                            options={OPERANDS.filter(
                                                (operand) =>
                                                    // Select the operands that contain the field type
                                                    operand.form_type.includes(
                                                        condition.field_type
                                                    )
                                            )}
                                            placeholder="Operador"
                                            isSearchable
                                            noOptionsMessage={() =>
                                                'No hay opciones'
                                            }
                                            onChange={(option) => {
                                                handleOperandChange(
                                                    option,
                                                    index
                                                )
                                            }}
                                            defaultValue={
                                                condition.operand &&
                                                OPERANDS.find((operand) => {
                                                    return (
                                                        operand.value ===
                                                        condition.operand
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="goal_program">
                                            Valor
                                        </label>
                                        {condition.field_type === 'select' ||
                                        condition.field_type ===
                                            'select multiple' ? (
                                            <Select
                                                options={SelectFieldOptions(
                                                    condition.form_id,
                                                    condition.field_id
                                                )}
                                                closeMenuOnSelect={false}
                                                placeholder="Valor"
                                                isSearchable
                                                isMulti
                                                noOptionsMessage={() => {
                                                    return 'No hay opciones'
                                                }}
                                                onChange={(option) => {
                                                    setData((data) => {
                                                        data.conditions[
                                                            fieldIndex
                                                        ].conditions[
                                                            index
                                                        ].field_value =
                                                            option.map(
                                                                (option) =>
                                                                    option.value
                                                            )
                                                        return data
                                                    })
                                                    setCounter(
                                                        (counter) => counter + 1
                                                    )
                                                }}
                                                defaultValue={
                                                    condition.field_value &&
                                                    SelectFieldOptions(
                                                        condition.form_id,
                                                        condition.field_id
                                                    ).filter((option) => {
                                                        return condition.field_value.includes(
                                                            option.value
                                                        )
                                                    })
                                                }
                                            />
                                        ) : (
                                            <input
                                                type={condition.field_type}
                                                className="form-control"
                                                id="goal_program"
                                                placeholder="Valor"
                                                onChange={(e) => {
                                                    setData((data) => {
                                                        data.conditions[
                                                            fieldIndex
                                                        ].conditions[
                                                            index
                                                        ].field_value =
                                                            e.target.value
                                                        return data
                                                    })
                                                    setCounter(
                                                        (counter) => counter + 1
                                                    )
                                                }}
                                                defaultValue={
                                                    condition.field_value &&
                                                    condition.field_value
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}
