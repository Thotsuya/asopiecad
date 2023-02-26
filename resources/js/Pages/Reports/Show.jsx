import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/inertia-react'
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
import { Line } from 'react-chartjs-2'
import { Inertia } from '@inertiajs/inertia'

export default function Show({
    auth,
    project,
    results,
    beneficiaries,
    global,
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
                text: 'Beneficiarios en el proyecto: ' + project.project_name,
            },
        },
    }

    const data = {
        labels: beneficiaries
            ? beneficiaries.map((beneficiary) => beneficiary.label)
            : [],
        datasets: [
            {
                label: 'Beneficiarios a lo largo del tiempo',
                data: beneficiaries
                    ? beneficiaries.map((beneficiary) => beneficiary.value)
                    : [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const exportToExcel = () => {
        window.open(
            route('projects.export', { project: project.uuid }),
            '_blank'
        )
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Configurar reportes" />
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
                            <i className="fa fa-file-excel-o" /> Exportar
                        </button>
                    </h4>
                    <div className="alert alert-info">
                        <p>
                            <i className="fa fa-info-circle" /> En esta sección
                            puedes configurar los indicadores que se mostrarán
                            en los reportes de este proyecto. Selecciona uno de
                            los campos que componen los formularios de este
                            proyecto, elige un tipo de grafico, nombre y
                            descripción del indicador, para luego agregarlo a la
                            lista de indicadores.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row">
                {results.map((result, index) => (
                    <div className="col-xs-12 col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table-xs table-bordered table-striped margin-bottom-10">
                                        <thead>
                                            <tr>
                                                <th
                                                    rowSpan={2}
                                                    className="text-center text-sm padding-10 bg-primary"
                                                >
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
                                                    Progreso
                                                </th>
                                                <th className="text-center text-sm padding-10 bg-primary">
                                                    Porcentaje completado
                                                </th>
                                                {result.conditions &&
                                                    result.conditions.map(
                                                        (condition) => (
                                                            <th className="text-center text-sm padding-10 bg-primary">
                                                                {
                                                                    condition.label
                                                                }
                                                            </th>
                                                        )
                                                    )}
                                                <th className="text-center text-white text-sm padding-10 bg-info">
                                                    Visitas realizadas a los
                                                    beneficiarios en este
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
                                            <tr>
                                                <td
                                                    style={{
                                                        width: '250px',
                                                    }}
                                                    className="text-center text-sm padding-10"
                                                >
                                                    {result.goal_description}
                                                </td>
                                                <td className="text-center bg-warning text-sm padding-10">
                                                    <span className="text-white">
                                                        {result.goal_target}
                                                    </span>
                                                </td>
                                                <td className="text-center bg-success text-sm padding-10">
                                                    <span className="text-white">
                                                        {
                                                            result.program
                                                                .beneficiaries_count
                                                        }
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
                                                {result.conditions &&
                                                    result.conditions.map(
                                                        (condition) => (
                                                            <td className="text-center text-sm padding-10">
                                                                {
                                                                    condition.value
                                                                }
                                                            </td>
                                                        )
                                                    )}
                                                <td className="text-center text-sm padding-10">
                                                    {result.visits}
                                                </td>
                                                <td className="text-center text-sm padding-10">
                                                    <strong>
                                                        {
                                                            result.program
                                                                .beneficiaries_count
                                                        }
                                                    </strong>
                                                </td>
                                                <td className="text-center text-sm padding-10">
                                                    <strong>
                                                        {result.goal_target -
                                                            result.program
                                                                .beneficiaries_count}
                                                    </strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

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
                                            <table className="table-xs table-bordered table-striped margin-bottom-10">
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
                                                            Progreso
                                                        </th>
                                                        <th className="text-center text-sm padding-10 bg-primary">
                                                            Porcentaje
                                                            completado
                                                        </th>
                                                        {global &&
                                                            global.conditions &&
                                                            global.conditions.map(
                                                                (condition) => (
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
                                                            Visitas realizadas a
                                                            los beneficiarios en
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
                                                                (condition) => (
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

                {beneficiaries && (
                    <div className="col-xs-12 col-md-12">
                        <div className="box-content">
                            <div className="row">
                                <div className="col-xs-12">
                                    <Line options={options} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    )
}
