import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'

export default function SelectInput({
    field,
    onClick = () => {},
    editable = true,
    onChange = () => {},
    value,
    error = '',
}) {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        setOptions(() => {
            return field.options.map((option) => {
                return {
                    value: option.value,
                    label: option.name,
                }
            })
        })
    }, [])

    useEffect(() => {
        // Set the selected option when value is updated
        if (field.type === 'select multiple') {
            setSelected(() => {
                return value?.map((option) => {
                    return options.findIndex((opt) => {
                        return opt.value === option
                    })
                })
            })
        } else {
            setSelected(() => {
                return options.findIndex((option) => option.value === value)
            })
        }

        // Check if there are custom options
        if (field.type === 'select multiple') {
            let customOptions = value?.filter((option) => {
                // Return the option that are not in the options array
                return (
                    options.findIndex((opt) => {
                        return opt.value === option
                    }) === -1
                )
            })

            // Add the custom options to the options array
            if (customOptions?.length > 0) {
                setOptions((prevOptions) => {
                    return [
                        ...prevOptions,
                        ...customOptions.map((option) => {
                            return {
                                value: option,
                                label:
                                    // Replace underscores with spaces, and capitalize the first letter
                                    option
                                        .replace(/_/g, ' ')
                                        .charAt(0)
                                        .toUpperCase() +
                                    option
                                        .replace(/_/g, ' ')
                                        .slice(1)
                                        .toLowerCase(),
                            }
                        }),
                    ]
                })
            }
        } else {
            // Check that the value value is not in the options array

            let customOption = field.options.filter((option) => {
                return option.value === value
            })

            if (
                customOption.length === 0 &&
                value !== null &&
                value !== undefined
            ) {
                // This is to avoid adding the same option twice and
                // prevent the component from getting stuck in an infinite loop
                // as the options array is updated, which triggers the useEffect
                if (options.length <= field.options.length) {
                    setOptions((prevOptions) => {
                        return [
                            ...prevOptions,
                            {
                                value: value,
                                label:
                                    // Replace underscores with spaces, and capitalize the first letter
                                    value
                                        .replace(/_/g, ' ')
                                        .charAt(0)
                                        .toUpperCase() +
                                    value
                                        .replace(/_/g, ' ')
                                        .slice(1)
                                        .toLowerCase(),
                            },
                        ]
                    })
                }
            }
        }
    }, [value, options])

    const handleChange = (option) => {
        if (field.type === 'select') {
            setSelected(() => {
                return field.options.findIndex((opt) => {
                    return opt.value === option.value
                })
            })
            onChange(option.value)
        }

        if (field.type === 'select multiple') {
            setSelected(() => {
                return option.map((opt) => {
                    return field.options.findIndex((option) => {
                        return option.value === opt.value
                    })
                })
            })
            onChange(option.map((opt) => opt.value))
        }
    }

    const setSelectedOptions = () => {
        if (field.type === 'select') {
            return options[selected]
        }

        if (field.type === 'select multiple') {
            return selected?.map((index) => options[index])
        }
    }

    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, '_'),
    })

    const handleCreate = (inputValue) => {
        const newOption = createOption(inputValue)
        setOptions((oldOptions) => [...oldOptions, newOption])
        let SelectedOptions = options
            .map((option) => {
                return option.value
            })
            .filter((option) => {
                return value.includes(option)
            })

        SelectedOptions.push(newOption.value)

        if (field.type === 'select') {
            onChange(newOption.value)
        }

        if (field.type === 'select multiple') {
            onChange(SelectedOptions)
        }
    }

    return (
        <div
            className={`${field.size} margin-bottom-10 form-group ${
                error ? 'has-error' : ''
            }`}
        >
            <label htmlFor={field.slug}>
                {field.name}
                {field.required && <span className="text-danger">*</span>}
                {editable && <i className="fa fa-times" onClick={onClick} />}
            </label>

            <CreatableSelect
                options={options}
                onCreateOption={handleCreate}
                value={setSelectedOptions()}
                placeholder={'Selecciona una opción'}
                id={`${field.slug}-${field.id}`}
                isMulti={field.type === 'select multiple'}
                onChange={handleChange}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}
