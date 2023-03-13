import useFilters from '@/Hooks/Filters'
import Select from 'react-select'

export default function Filters({ projects }) {
    const { filters, data, setData, processing, handleSearch } = useFilters()

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="box-content">
                    <h4 className="box-title">Filtros</h4>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="filter">Buscar por:</label>
                                <Select
                                    id="filter"
                                    name="filter"
                                    options={filters}
                                    placeholder="Seleccione un filtro"
                                    onChange={(option) => {
                                        setData({
                                            ...data,
                                            filter: option.value,
                                            value: '',
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="project">Valor:</label>
                                {data.filter === 'project_id' && (
                                    <Select
                                        id="project"
                                        name="project"
                                        options={projects.map((project) => ({
                                            value: project.uuid,
                                            label: project.project_name,
                                        }))}
                                        placeholder="Seleccione un proyecto"
                                        onChange={(option) => {
                                            setData({
                                                ...data,
                                                value: option.value,
                                            })
                                        }}
                                    />
                                )}

                                {data.filter !== 'project_id' && (
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="value"
                                        name="value"
                                        placeholder="Escribe el valor a buscar"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                value: e.target.value,
                                            })
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="">&nbsp;</label>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    disabled={processing}
                                    onClick={handleSearch}
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
