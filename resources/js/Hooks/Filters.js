import { useState } from 'react'

export default function useFilters(projects, fields) {
    const [filters, setFilters] = useState([])

    const addFilter = (type = 'object') => {
        setFilters([
            ...filters,
            {
                model: 'project',
                field: projects[0] ? projects[0].id : null,
                operator: '',
                value: '',
            },
        ])
    }

    const removeFilter = (index) => {
        let newFilters = [...filters]
        newFilters.splice(index, 1)
        setFilters(newFilters)
    }

    const updateFilter = (index, field, value) => {
        let newFilters = [...filters]
        newFilters[index][field] = value
        setFilters(newFilters)
    }

    const transformFilters = () => {
        console.log(
            filters.map((filter) => {
                return {
                    model: filter.model,
                    field: filter.field.slug ?? filter.field,
                    operator: filter.operator,
                    value: filter.value,
                }
            })
        )
    }

    return {
        filters,
        addFilter,
        removeFilter,
        updateFilter,
        transformFilters,
    }
}
