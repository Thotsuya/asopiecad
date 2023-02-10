import Select from 'react-select'
import { useEffect, useState } from 'react'

export default function Conditions({
    options,
    program,
    onFormChange,
    onFieldChange,
}) {
    const [forms, setForms] = useState([])

    const handleChange = (option) => {
        console.log(option)

        let fields = program.forms.find(
            (form) => form.id === option.value
        ).fields

        setForms(() => {
            return fields.map((field) => {
                return {
                    value: field.id,
                    label: field.name,
                }
            })
        })

        onFormChange(option.value)
    }

    return (
        <div className="row">
            <div className="col-xs-6">
                <div className="form-group">
                    <label htmlFor="goal_program">
                        Vincular a un formulario
                    </label>
                    <Select
                        options={options}
                        placeholder="Formularios"
                        isSearchable
                        noOptionsMessage={() => 'No hay opciones'}
                        onChange={(option) => handleChange(option)}
                    />
                </div>
            </div>
            <div className="col-xs-6">
                <div className="form-group">
                    <label htmlFor="goal_program">
                        Vincular a un campo de formulario
                    </label>
                    <Select
                        options={forms}
                        placeholder="Campos de formulario"
                        isSearchable
                        noOptionsMessage={() => 'No hay opciones'}
                        onChange={(option) => onFieldChange(option.value)}
                    />
                </div>
            </div>
        </div>
    )
}
