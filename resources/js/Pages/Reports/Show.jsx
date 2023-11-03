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
import ScreeningsRow from "@/Components/Screenings/ScreeningsIndicator";
import ResultRow from "@/Pages/Reports/ResultRow";

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
                                 meeting_goals = [],
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

        Inertia.post(
            route('projects.export', {project: project.uuid}),
            {
                start_date: startDate,
                end_date: endDate,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onBefore: () => {
                    setFilterLoading(true)
                    setReportLoading(false)
                },
                onSuccess: () => {
                    setFilterLoading(false)
                    setReportLoading(true)
                },
                onFinish: () => {
                    setFilterLoading(false)
                },
                onError: (err) => {
                    console.log(err)
                }
            }
        )


    }

    const startDateRef = useRef(null)
    const endDateRef = useRef(null)
    const [filterloading, setFilterLoading] = useState(false)
    const [reportLoading, setReportLoading] = useState(false)

    const filterResults = () => {
        const startDate = startDateRef.current.value
        const endDate = endDateRef.current.value
        Inertia.post(
            route('projects.export', {project: project.uuid}),
            {
                start_date: startDate,
                end_date: endDate,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onBefore: () => {
                    setFilterLoading(true)
                    setReportLoading(false)
                },
                onSuccess: () => {
                    setFilterLoading(false)
                    setReportLoading(true)
                },
                onFinish: () => {
                    setFilterLoading(false)
                },
                onError: (err) => {
                    console.log(err)
                }
            }
        )
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
                            disabled={filterloading || reportLoading}
                        >
                            <i className="fa fa-file-excel-o"/>
                            {reportLoading ? 'Generando...' : 'Exportar a Excel'}
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
                            <br/>
                            <strong>Nota:</strong> Los
                            indicadores se actualizarán cada 15 minutos.
                        </p>
                    </div>

                    {reportLoading && (
                        <div className="alert alert-success">
                            <p>
                                <i className="fa fa-check-circle"/> El Reporte está siendo generado. Por favor espera un
                                momento.
                                Puedes seguir trabajando en el sistema mientras se genera el reporte. Una vez que el
                                reporte esté listo, se mostrara en la sección de reportes
                                en el menú lateral.
                            </p>
                        </div>
                    )}
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
                                    disabled={filterloading || reportLoading}
                                    className="btn btn-primary pull-right"
                                >
                                    Filtrar <i className="fa fa-filter"/>
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


                {project.grouped_results.length > 0 && (
                    <div className="col-xs-12 col-md-12 overflow-auto">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table-xs table-bordered table-striped margin-bottom-10">
                                        <thead>
                                        <tr>
                                            <th className="text-center text-sm padding-10 bg-primary">
                                                Resultado
                                            </th>
                                            <th
                                                className="text-center text-sm padding-10 bg-primary"
                                            >
                                                Meta
                                            </th>
                                            <th
                                                className="text-center text-sm padding-10 bg-primary"
                                            >
                                                Meta Anual
                                            </th>

                                            <th
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
                                                            key={`header-${index}`}
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
                                        {project.grouped_results && project.grouped_results.length > 0 && project.grouped_results.map((result, index) => (
                                            <>
                                                <tr key={`result-${index}`}>
                                                    <td
                                                        style={{
                                                            minWidth: '400px',
                                                        }}
                                                        rowSpan={result.goals.length + result.meetings.length + 1}
                                                        className="text-justify text-sm padding-10">
                                                        {result.title}
                                                    </td>
                                                </tr>
                                                {result.goals
                                                    .map((goal, index) => {
                                                        let result = JSON.parse(goal.pivot.value);

                                                        return <ResultRow key={`goal-${index}`} headers={headers}
                                                                          result={result} showGoalDescription={false}/>
                                                    })}
                                                {result.meetings.map((meeting, index) => {
                                                    let result = JSON.parse(meeting.pivot.value);

                                                    return <ResultRow key={`meeting-${index}`} headers={headers}
                                                                      result={result} showGoalDescription={false}/>
                                                })}

                                            </>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!filterloading && (
                    <div className="col-xs-12 col-md-12 overflow-auto">
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
                                                Número total de registros
                                            </th>
                                            <th className="text-center text-sm padding-10  bg-primary">
                                                Pendientes
                                            </th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {results &&
                                            results
                                                .filter((result) => result.visible === 1)
                                                .map((result, index) => {

                                                    if (index === 2 && project.id === 1) return <ScreeningsRow
                                                        screenings={screenings}/>

                                                    if (index === 5 && project.id === 2) return <ScreeningsRow
                                                        screenings={screenings}/>

                                                    return <ResultRow
                                                        key={`goal-result-${index}`}
                                                        headers={headers}
                                                        result={result}
                                                        highlightIfNotActive
                                                    />
                                                })}
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
            </div>
        </AuthenticatedLayout>
    )
}
