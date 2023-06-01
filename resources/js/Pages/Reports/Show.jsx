import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/inertia-react'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {Inertia} from '@inertiajs/inertia'
import {useRef, useState} from 'react'

export default function Show({
                                 auth,
                                 project,
                                 results,
                                 headers,
                                 labels,
                                 global,
                                 datasets,
                                 start_date = null,
                                 end_date = null,
                                 screenings = [],
                             }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Participantes en el proyecto: ' + project.project_name,
            },
        },
    }

    const data = {
        labels,
        datasets,
    }

    const exportToExcel = () => {
        const startDate = startDateRef.current.value
        const endDate = endDateRef.current.value

        const params = {
            project: project.uuid,
        }

        if (startDate && endDate) {
            Object.assign(params, {
                start_date: startDate,
                end_date: endDate,
            })
        }

        window.open(route('projects.export', params), '_blank')
    }

    const startDateRef = useRef(null)
    const endDateRef = useRef(null)
    const [filterloading, setFilterLoading] = useState(false)

    const filterResults = () => {
        const startDate = startDateRef.current.value
        const endDate = endDateRef.current.value
        if (startDate && endDate) {
            Inertia.get(
                route('projects.reports.index', {project: project.uuid}),
                {
                    start_date: startDate,
                    end_date: endDate,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onBefore: () => {
                        setFilterLoading(true)
                    },
                    onFinish: () => {
                        setFilterLoading(false)
                    },
                }
            )
        }
    }

    const resetFilters = () => {
        Inertia.get(
            route('projects.reports.index', {project: project.uuid}),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onBefore: () => {
                    setFilterLoading(true)
                },
                onFinish: () => {
                    setFilterLoading(false)
                },
            }
        )
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Configurar reportes"/>
            <div className="row">
                <div className="col-xs-12">
                    <h4 className="box-title">
                        Reportes
                        <button
                            onClick={exportToExcel}
                            className="btn btn-primary btn-sm"
                            style={{
                                marginLeft: '10px',
                            }}
                        >
                            <i className="fa fa-file-excel-o"/> Exportar
                        </button>
                    </h4>
                    <div className="alert alert-info">
                        <p>
                            <i className="fa fa-info-circle"/> En esta sección
                            puedes configurar los indicadores que se mostrarán
                            en los reportes de este proyecto. Selecciona uno de
                            los campos que componen los formularios de este
                            proyecto, elige un tipo de grafico, nombre y
                            descripción del indicador, para luego agregarlo a la
                            lista de indicadores.
                        </p>
                    </div>
                </div>

                <div className="col-xs-12">
                    <div className="box-content">
                        <h4>Filtrar por rango de fecha</h4>
                        <p className="font-13">
                            Selecciona un rango de fechas para filtrar los
                            resultados de los indicadores.
                        </p>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <div className="form-group">
                                    <label>Fecha de inicio</label>
                                    <input
                                        type="date"
                                        ref={startDateRef}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <div className="form-group">
                                    <label>Fecha de fin</label>
                                    <input
                                        type="date"
                                        ref={endDateRef}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <button
                                    onClick={filterResults}
                                    disabled={filterloading}
                                    className="btn btn-primary pull-right"
                                >
                                    Filtrar <i className="fa fa-filter"/>
                                </button>
                                <button
                                    onClick={resetFilters}
                                    disabled={filterloading}
                                    style={{marginRight: '10px'}}
                                    className="btn btn-danger pull-right"
                                >
                                    <i className="fa fa-times"/> Limpiar
                                    filtros
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {filterloading && (
                    <div className="col-xs-12">
                        <div className="alert alert-info">
                            <p>
                                <i className="fa fa-info-circle"/> Cargando
                                resultados...
                            </p>
                        </div>
                    </div>
                )}

                {start_date && end_date && !filterloading && (
                    <div className="col-xs-12">
                        <div className="alert alert-info">
                            <p>
                                <i className="fa fa-info-circle"/> Se están
                                mostrando los resultados del rango de fechas{' '}
                                <strong>{start_date}</strong> al{' '}
                                <strong>{end_date}</strong>
                            </p>
                        </div>
                    </div>
                )}

                {!filterloading && (
                    <div className="col-xs-12 col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table-xs table-bordered table-striped margin-bottom-10">
                                        <thead>
                                        <tr>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Descripción de los
                                                indicadores
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="text-center text-sm padding-10 bg-primary"
                                            >
                                                Meta
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="text-center text-sm padding-10 bg-primary"
                                            >
                                                Meta Anual
                                            </th>

                                            <th
                                                rowSpan={2}
                                                className="text-center text-sm padding-10 bg-primary"
                                            >
                                                Progreso
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Porcentaje completado
                                            </th>
                                            {headers &&
                                                headers.length > 0 &&
                                                headers.map(
                                                    (header, index) => (
                                                        <th
                                                            key={index}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            {header}
                                                        </th>
                                                    )
                                                )}
                                            <th className="text-center text-white text-sm padding-10 bg-info">
                                                Visitas realizadas a los
                                                participantes en este
                                                indicador
                                            </th>
                                            <th className="text-center  text-sm padding-10 bg-primary">
                                                Número total de personas
                                            </th>
                                            <th className="text-center text-sm padding-10  bg-primary">
                                                Pendientes
                                            </th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {results &&
                                            results.map((result, index) => (
                                                <tr key={index}>
                                                    <td className="text-center text-sm padding-10">
                                                        {
                                                            result.goal_description
                                                        }
                                                    </td>
                                                    <td
                                                        style={{
                                                            backgroundColor:
                                                                '#FFFF99',
                                                        }}
                                                        className="text-center text-sm padding-10"
                                                    >
                                                        <strong>
                                                            {
                                                                result.goal_target
                                                            }
                                                        </strong>
                                                    </td>
                                                    <td className="text-center bg-info text-sm padding-10">
                                                            <span className="text-white">
                                                                {
                                                                    parseInt(result.goal_target_year)
                                                                }
                                                            </span>
                                                    </td>
                                                    <td
                                                        title={
                                                            result.is_grouped
                                                                ? `Se añadira un valor cada ${result.group_every} registros`
                                                                : ''
                                                        }
                                                        className="text-center bg-success text-sm padding-10"
                                                    >
                                                            <span className="text-white">
                                                                {
                                                                    result
                                                                        .program
                                                                        .beneficiaries_count
                                                                }
                                                                {result.is_grouped && (
                                                                    <>
                                                                        {' '}
                                                                        <i className="fa fa-group"/>
                                                                    </>
                                                                )}
                                                            </span>
                                                    </td>
                                                    <td className="text-sm padding-10">
                                                        <div className="progress">
                                                            <div
                                                                className="progress-bar progress-bar-striped progress-bar-success active"
                                                                role="progressbar"
                                                                aria-valuenow="40"
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                                style={{
                                                                    width:
                                                                        result
                                                                            .program
                                                                            .completed_percentage +
                                                                        '%',
                                                                }}
                                                            >
                                                                    <span>
                                                                        {parseInt(
                                                                            result
                                                                                .program
                                                                                .completed_percentage
                                                                        )}
                                                                        %
                                                                    </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {headers &&
                                                        headers.map(
                                                            (
                                                                header,
                                                                index
                                                            ) => (
                                                                <td
                                                                    key={
                                                                        index
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            '#FFFF99',
                                                                    }}
                                                                    className="text-center text-sm padding-10"
                                                                >
                                                                    <strong>
                                                                        {result.conditions.find(
                                                                            (
                                                                                condition
                                                                            ) =>
                                                                                condition.label ===
                                                                                header
                                                                        )
                                                                            ? result.conditions.find(
                                                                                (
                                                                                    condition
                                                                                ) =>
                                                                                    condition.label ===
                                                                                    header
                                                                            )
                                                                                .value
                                                                            : 'N/A'}
                                                                    </strong>
                                                                </td>
                                                            )
                                                        )}
                                                    <td className="text-center text-sm padding-10">
                                                        {
                                                            result.program
                                                                .visits
                                                        }
                                                    </td>
                                                    <td className="text-center text-sm padding-10">
                                                        <strong>
                                                            {
                                                                result
                                                                    .program
                                                                    .total_ungrouped
                                                            }
                                                        </strong>
                                                    </td>
                                                    <td className="text-center text-sm padding-10">
                                                        <strong>
                                                            {
                                                                result
                                                                    .program
                                                                    .pending
                                                            }
                                                        </strong>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!filterloading && (
                    <div className="col-xs-12 col-md-12 margin-top-10">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box-content">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">
                                            <i className="fa fa-bar-chart"></i>{' '}
                                            Indicador Global
                                        </h3>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                                <table
                                                    className="table-xs table-bordered table-striped margin-bottom-10">
                                                    <thead>
                                                    <tr>
                                                        <th
                                                            rowSpan={2}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            Descripción del
                                                            Indicador
                                                        </th>
                                                        <th
                                                            rowSpan={2}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            Meta
                                                        </th>
                                                        <th
                                                            rowSpan={2}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            Progreso Total
                                                        </th>
                                                        <th
                                                            rowSpan={2}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            Progreso a la
                                                            fecha
                                                        </th>
                                                        <th className="text-center text-sm padding-10 bg-primary">
                                                            Porcentaje
                                                            completado
                                                        </th>
                                                        {global &&
                                                            global.conditions &&
                                                            global.conditions.map(
                                                                (
                                                                    condition
                                                                ) => (
                                                                    <th className="text-center text-sm padding-10 bg-primary">
                                                                        {
                                                                            condition.label
                                                                        }
                                                                    </th>
                                                                )
                                                            )}
                                                        <th
                                                            rowSpan={2}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            Visitas
                                                            realizadas a los
                                                            participantes en
                                                            total
                                                        </th>
                                                        <th
                                                            rowSpan={2}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            Número total de
                                                            personas
                                                        </th>
                                                        <th
                                                            rowSpan={2}
                                                            className="text-center text-sm padding-10 bg-primary"
                                                        >
                                                            Restante
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-center text-sm padding-10">
                                                            {global &&
                                                                global.goal_description}
                                                        </td>
                                                        <td className="text-center bg-warning text-sm padding-10">
                                                                <span className="text-white">
                                                                    {global &&
                                                                        global.goal_target}
                                                                </span>
                                                        </td>
                                                        <td className="text-center bg-success text-sm padding-10">
                                                                <span className="text-white">
                                                                    {global &&
                                                                        global.total_beneficiaries}
                                                                </span>
                                                        </td>
                                                        <td className="text-center bg-info text-sm padding-10">
                                                                <span className="text-white">
                                                                    {global &&
                                                                        global.current_progress}
                                                                </span>
                                                        </td>
                                                        <td className="text-center text-sm padding-10">
                                                            <div className="progress">
                                                                <div
                                                                    className="progress-bar progress-bar-striped progress-bar-success active"
                                                                    role="progressbar"
                                                                    aria-valuenow="40"
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"
                                                                    style={{
                                                                        width:
                                                                            global.completed_percentage +
                                                                            '%',
                                                                    }}
                                                                >
                                                                        <span>
                                                                            {parseInt(
                                                                                global.completed_percentage
                                                                            )}
                                                                            %
                                                                        </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {global &&
                                                            global.conditions &&
                                                            global.conditions.map(
                                                                (
                                                                    condition
                                                                ) => (
                                                                    <td className="text-center text-sm padding-10">
                                                                        {
                                                                            condition.value
                                                                        }
                                                                    </td>
                                                                )
                                                            )}
                                                        <td className="text-center text-sm padding-10">
                                                            {global &&
                                                                global.total_visits}
                                                        </td>
                                                        <td className="text-center text-sm padding-10">
                                                            <strong>
                                                                {global &&
                                                                    global.total_beneficiaries}
                                                            </strong>
                                                        </td>
                                                        <td className="text-center text-sm padding-10">
                                                            <strong>
                                                                {global &&
                                                                    global.goal_target -
                                                                    global.total_beneficiaries}
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {project.id === 1 && (
                    <div className="col-xs-12 col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table-xs table-bordered table-striped margin-bottom-10">
                                        <thead>
                                        <tr>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Descripción de los
                                                indicadores
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Meta
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Progreso Total
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Porcentaje completado
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Niños menores de 18 años sin discapacidad
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Niños menores de 18 años con discapacidad
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Niñas menores de 18 años sin discapacidad
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Niñas menores de 18 años con discapacidad
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Hombres mayores de 18 años sin discapacidad
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Hombres mayores de 18 años con discapacidad
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Mujeres mayores de 18 años sin discapacidad
                                            </th>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Mujeres mayores de 18 años con discapacidad
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {console.log(screenings)}
                                        <tr>
                                            <td className="text-center text-sm padding-10">
                                                {screenings.title}
                                            </td>
                                            <td className="text-center bg-warning text-sm padding-10">
                                                <span className="text-white">
                                                    7200
                                                </span>
                                            </td>
                                            <td className="text-center bg-success text-sm padding-10">
                                                <span className="text-white">
                                                    {screenings.total_screenings}
                                                </span>
                                            </td>
                                            <td className="text-center bg-info text-sm padding-10">
                                                <span className="text-white">
                                                    {screenings.completed_percentage}%
                                                </span>
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                {screenings.males_below_18_without_disabilities}
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                0
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                {screenings.females_below_18_without_disabilities}
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                0
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                0
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                0
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                0
                                            </td>
                                            <td className="text-center text-sm padding-10">
                                                0
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {datasets && (
                    <div className="col-xs-12 col-md-12">
                        <div className="box-content">
                            <div className="row">
                                <div className="col-xs-12">
                                    <Line options={options} data={data}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    )
}
