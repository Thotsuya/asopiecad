import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'

export default function Show({ auth, project, results }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Configurar reportes" />
            {console.log(results)}
            <div className="row">
                <div className="col-xs-12">
                    <h4 className="box-title">Configurar reportes</h4>
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
                {console.log(results)}
                {results.map((result, index) => (
                    <div className="col-xs-12 col-md-12">
                        <div className="box-content">
                            <div className="row">
                                <div className="col-md-12">
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
                                                                    condition.form_name
                                                                }
                                                            </th>
                                                        )
                                                    )}
                                                {result.conditions &&
                                                    result.conditions.map(
                                                        (condition) => (
                                                            <th className="text-center bg-primary">
                                                                {
                                                                    condition.field_name
                                                                }
                                                            </th>
                                                        )
                                                    )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="text-center">
                                                    {result.goal_description}
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
                                                                    condition.form_count
                                                                }
                                                            </td>
                                                        )
                                                    )}
                                                {/*  Stacked row  */}
                                                {result.conditions &&
                                                    result.conditions.map(
                                                        (condition) => (
                                                            <td>
                                                                {Object.keys(
                                                                    condition.field_count
                                                                ).map((key) => (
                                                                    <span>
                                                                        {key}:{' '}
                                                                        {
                                                                            condition
                                                                                .field_count[
                                                                                key
                                                                            ]
                                                                        }
                                                                        <br />
                                                                    </span>
                                                                ))}
                                                            </td>
                                                        )
                                                    )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    )
}
