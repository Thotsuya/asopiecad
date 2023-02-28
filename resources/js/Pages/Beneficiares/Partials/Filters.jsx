import useFilters from '@/Hooks/Filters'
import ProjectsSelect from '@/Pages/Beneficiares/Partials/ProjectsSelect'
import FieldsSelect from '@/Pages/Beneficiares/Partials/FieldsSelect'
import { useEffect } from 'react'
import { OPERATORS } from '@/Constants/Operators'
import SelectField from '@/Components/SelectField'
import Select from 'react-select'

export default function Filters({ fields, projects }) {
    const { addFilter, removeFilter, filters, updateFilter, transformFilters } =
        useFilters(projects, fields)

    const handleField = (e, index) => {
        updateFilter(index, e.target.name, e.target.value)
    }

    const handleModelType = (model, index) => {
        if (model === 'project') return projects[0].id
        if (model === 'form') return fields[0]
        return ''
    }

    const handleOperator = (model) => {
        if (model === 'form') {
            return OPERATORS.filter((operator) => {
                return operator.types.includes(fields[0].type)
            })[0].value
        }
        return '=='
    }

    useEffect(() => {
        console.log(filters)
    }, [filters])

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="box-content">
                    <h4 className="box-title">
                        Filtros
                        <button
                            type="button"
                            className="btn btn-primary btn-sm pull-right"
                            onClick={addFilter}
                        >
                            <i className="fa fa-plus" />
                        </button>
                    </h4>

                    {filters.map((filter, index) => (
                        <div key={index} className="row">
                            <div className="col-xs-12 col-lg-3">
                                <div className="form-group">
                                    <label htmlFor="name">Buscar por:</label>
                                    <Select
                                        name="model"
                                        placeholder="Seleccione un parámetro de búsqueda"
                                        options={[
                                            {
                                                value: 'name',
                                                label: 'Nombre del beneficiario',
                                            },
                                            {
                                                value: 'internal_id',
                                                label: 'Código del beneficiario',
                                            },
                                            {
                                                value: 'project',
                                                label: 'Proyecto',
                                            },
                                            {
                                                value: 'form',
                                                label: 'Información',
                                            },
                                        ]}
                                        onChange={(e) => {
                                            updateFilter(
                                                index,
                                                'model',
                                                e.value
                                            )
                                            updateFilter(
                                                index,
                                                'model_type',
                                                handleModelType(e.value, index)
                                            )
                                            updateFilter(
                                                index,
                                                'operator',
                                                handleOperator(e.value)
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12 col-lg-3">
                                <div className="form-group">
                                    <label htmlFor="name">Seleccionar</label>
                                    {(filter.model === 'name' ||
                                        filter.model === 'internal_id') && (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="field"
                                            onChange={handleField}
                                            value={filter.field}
                                        />
                                    )}
                                    {filter.model === 'project' && (
                                        <ProjectsSelect
                                            projects={projects}
                                            onProjectChange={handleField}
                                        />
                                    )}
                                    {filter.model === 'form' && (
                                        <FieldsSelect
                                            fields={fields}
                                            onFieldChange={(e) => {
                                                // The value of the field itself
                                                updateFilter(
                                                    index,
                                                    e.target.name,
                                                    JSON.parse(e.target.value)
                                                )

                                                // The value of the field's name
                                                // If it's a select field, the value of the selected option, otherwise the value of the field itself
                                                updateFilter(
                                                    index,
                                                    'value',
                                                    JSON.parse(e.target.value)
                                                        .type === 'select'
                                                        ? JSON.parse(
                                                              e.target.value
                                                          ).options[0].value
                                                        : ''
                                                )
                                                // The value of the field's operator
                                                updateFilter(
                                                    index,
                                                    'operator',
                                                    //Filter the operators by the field's type, and return the first operator
                                                    OPERATORS.filter(
                                                        (operator) => {
                                                            return operator.types.includes(
                                                                JSON.parse(
                                                                    e.target
                                                                        .value
                                                                ).type
                                                            )
                                                        }
                                                    )[0].value
                                                )
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            {filter.model === 'form' && (
                                <div className="col-xs-12 col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor="name">Operador</label>
                                        <select
                                            className="form-control"
                                            name="operator"
                                            onChange={(e) => {
                                                updateFilter(
                                                    index,
                                                    'operator',
                                                    e.target.value
                                                )
                                            }}
                                            value={filter.operator}
                                        >
                                            {OPERATORS.map(
                                                (operator, index) => (
                                                    <>
                                                        {operator.types.includes(
                                                            filter.field.type
                                                        ) && (
                                                            <option
                                                                key={
                                                                    operator.id
                                                                }
                                                                value={
                                                                    operator.value
                                                                }
                                                            >
                                                                {operator.name}
                                                            </option>
                                                        )}
                                                    </>
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>
                            )}
                            {filter.model === 'form' && (
                                <div className="col-xs-12 col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor="name">Valor</label>
                                        {filter.field.type === 'select' ? (
                                            <SelectField
                                                fields={filter.field.options}
                                                onFieldChange={(e) => {
                                                    updateFilter(
                                                        index,
                                                        'value',
                                                        e.target.value
                                                    )
                                                }}
                                            />
                                        ) : (
                                            <input
                                                type={filter.field.type}
                                                className="form-control"
                                                name="value"
                                                onChange={(e) => {
                                                    updateFilter(
                                                        index,
                                                        'value',
                                                        e.target.value
                                                    )
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {filters.length > 0 && (
                        <div className="row">
                            <div className="col-lg-12">
                                <button
                                    type="button"
                                    className="btn btn-primary pull-right"
                                    onClick={transformFilters}
                                >
                                    Buscar <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
