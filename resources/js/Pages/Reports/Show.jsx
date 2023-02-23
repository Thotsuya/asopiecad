import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'
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

export default function Show({ auth, project, results, beneficiaries }) {
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

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Configurar reportes" />
            {console.log(results)}
            <div className="row">
                <div className="col-xs-12">
                    <h4 className="box-title">Reportes</h4>
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
                        <div className="box-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th
                                                        rowSpan={2}
                                                        className="text-center bg-primary"
                                                    >
                                                        #
                                                    </th>
                                                    <th
                                                        rowSpan={2}
                                                        className="text-center bg-primary"
                                                    >
                                                        Descripción de los
                                                        indicadores
                                                    </th>
                                                    <th
                                                        rowSpan={2}
                                                        className="text-center bg-primary"
                                                    >
                                                        Meta
                                                    </th>
                                                    <th
                                                        rowSpan={2}
                                                        className="text-center bg-primary"
                                                    >
                                                        Progreso
                                                    </th>
                                                    <th className="text-center bg-primary">
                                                        Porcentaje completado
                                                    </th>
                                                    {result.conditions &&
                                                        result.conditions.map(
                                                            (condition) => (
                                                                <th className="text-center bg-primary">
                                                                    {
                                                                        condition.label
                                                                    }
                                                                </th>
                                                            )
                                                        )}
                                                    <th className="text-center bg-primary">
                                                        Número total de personas
                                                    </th>
                                                    <th className="text-center bg-primary">
                                                        Pendientes
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-center">
                                                        {
                                                            result.goal_description
                                                        }
                                                    </td>
                                                    <td className="text-center bg-warning">
                                                        <span className="text-white">
                                                            {result.goal_target}
                                                        </span>
                                                    </td>
                                                    <td className="text-center bg-success">
                                                        <span className="text-white">
                                                            {
                                                                result.program
                                                                    .beneficiaries_count
                                                            }
                                                        </span>
                                                    </td>
                                                    <td>
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
                                                                <td className="text-center">
                                                                    {
                                                                        condition.value
                                                                    }
                                                                </td>
                                                            )
                                                        )}
                                                    <td className="text-center">
                                                        <strong>
                                                            {
                                                                result.program
                                                                    .beneficiaries_count
                                                            }
                                                        </strong>
                                                    </td>
                                                    <td className="text-center">
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
                    </div>
                ))}

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
