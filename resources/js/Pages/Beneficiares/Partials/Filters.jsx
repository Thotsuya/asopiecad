import useFilters from '@/Hooks/Filters'
import Select from 'react-select'
import {OPERATORS, OPERANDS} from "@/Constants/Operators";
import {useEffect, useMemo} from "react";

export default function Filters({projects, forms, users}) {
    const {
        filters,
        statusFilters,
        data,
        setData,
        processing,
        handleSearch,
        exportToExcel,
        exporting,
        loading
    } = useFilters()


    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="box-content">
                    <h4 className="box-title">Filtros</h4>

                    <div className="row">
                        <div className="col-md-2">
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

                        {data.filter === 'created_at' && (
                            <>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="from">Desde:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="from"
                                            name="from"
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    from: e.target.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="to">Hasta:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="to"
                                            name="to"
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    to: e.target.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {!data.filter.includes('form_id') && !data.filter.includes('created_at') && !data.filter.includes('created_by') && (
                            <>
                                <div className="col-md-4">
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

                                {data.filter === 'project_id' && (
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="program_id">Programa:</label>
                                            <Select
                                                id="program_id"
                                                name="program_id"
                                                isClearable={true}
                                                options={projects.find(project => project.uuid === data.value)?.programs.map((program) => {
                                                    return {
                                                        value: program.uuid,
                                                        label: program.program_name,
                                                    }
                                                })}
                                                placeholder="Seleccione un programa"
                                                onChange={(option) => {
                                                    setData({
                                                        ...data,
                                                        program_id: option?.value ? option?.value : null,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {data.filter === 'created_by' && (
                            <>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="user">Usuario:</label>
                                        <Select
                                            id="user"
                                            name="user"
                                            options={users.map((user) => ({
                                                value: user.id,
                                                label: user.name,
                                            }))}
                                            placeholder="Seleccione un usuario"
                                            onChange={(option) => {
                                                setData({
                                                    ...data,
                                                    value: option.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {data.filter === 'form_id' && (
                            <>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label htmlFor="form">Formulario:</label>
                                        <Select
                                            id="form"
                                            name="form"
                                            options={forms.map((form) => ({
                                                value: form.id,
                                                label: form.form_name,
                                            }))}
                                            placeholder="Seleccione un formulario"
                                            onChange={(option) => {
                                                setData({
                                                    ...data,
                                                    form_id: option.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label htmlFor="form">Campo:</label>
                                        {console.log(forms)}
                                        <Select
                                            id="field"
                                            name="field"
                                            options={forms.find(form => form.id === data.form_id)?.fields.map((field) => ({
                                                value: field.id,
                                                label: field.name,
                                            }))}
                                            placeholder="Seleccione un campo"
                                            onChange={(option) => {
                                                setData({
                                                    ...data,
                                                    field_id: option.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label htmlFor="form">Operador:</label>
                                        <Select
                                            id="operator"
                                            name="operator"
                                            options={OPERANDS
                                                .filter(operand => operand.form_type.includes(
                                                    forms.find(form => form.id === data.form_id)?.fields.find(field => field.id === data.field_id)?.type
                                                )).map((operator) => ({
                                                    value: operator.value,
                                                    label: operator.label,
                                                }))}
                                            placeholder="Seleccione un operador"
                                            onChange={(option) => {
                                                setData({
                                                    ...data,
                                                    operator: option.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label htmlFor="form">Valor:</label>
                                        {(forms.find(form => form.id === data.form_id)?.fields.find(field => field.id === data.field_id)?.type === 'select' ||
                                            forms.find(form => form.id === data.form_id)?.fields.find(field => field.id === data.field_id)?.type === 'select multiple'
                                        ) ? (
                                            <Select
                                                id="value"
                                                name="value"
                                                options={forms.find(form => form.id === data.form_id)?.fields.find(field => field.id === data.field_id)?.options.map((option) => ({
                                                    value: option.value,
                                                    label: option.name,
                                                }))}
                                                placeholder="Seleccione un valor"
                                                onChange={(option) => {
                                                    setData({
                                                        ...data,
                                                        value: option.value,
                                                    })
                                                }}
                                            />
                                        ) : (
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
                            </>
                        )}

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

                    <div className="row">
                        <div className="col-md-4 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="">Estado</label>
                                <Select
                                    id="status"
                                    name="status"
                                    options={statusFilters.map((status) => ({
                                        value: status.value,
                                        label: status.label,
                                    }))}
                                    placeholder="Seleccione un estado"
                                    onChange={(option) => {
                                        setData({
                                            ...data,
                                            status: option.value,
                                        })
                                    }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                exporting && (
                    <div className="col-xs-12">
                        <div className="alert alert-success">
                            <p>
                                <i className="fa fa-check"></i> Tu archivo esta siendo generado, espera un momento...
                                puedes seguir navegando en la plataforma. Cuando el archivo este listo, lo podrás descargar
                                en la
                                sección de
                                Reportes Excel.
                            </p>
                        </div>
                    </div>
                )
            }

            <div className="col-xs-12">
                <div className="box-content">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={exportToExcel}
                        disabled={exporting || loading}

                    >
                        {exporting ? 'Exportando...' : 'Exportar a Excel'}
                    </button>
                </div>
            </div>
        </div>
    )
}
