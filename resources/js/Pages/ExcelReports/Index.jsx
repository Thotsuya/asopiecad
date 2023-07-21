import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head} from '@inertiajs/inertia-react'
import Pagination from "@/Components/Pagination";

export default function Dashboard({
                                      auth,
                                      excelReports,
                                      pendingReports
                                  }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Reportes Excel"/>

            <div className="row">
                <div className="col-xs-12">
                    <h1>Reportes Excel</h1>
                </div>

                {pendingReports.length > 0 && pendingReports.map((pendingReport, index) => (
                   <div className="col-xs-12" key={index}>
                       <div className="alert alert-info">
                           <strong>Atención: </strong> El Reporte <strong>{pendingReport.file_name}</strong> esta siendo generado, por favor espere.
                       </div>
                   </div>
                ))}


                <div className="col-xs-12">
                    <div className="box-content table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Generado</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {excelReports.data.map((excelReport, index) => (
                                <tr key={excelReport.id}>
                                    <td>
                                        {index + excelReports.per_page * (excelReports.current_page - 1) + 1}
                                    </td>
                                    <td>
                                        <i className="fa fa-file-excel-o margin-right-5"></i>
                                        {excelReport.file_name}</td>
                                    <td>{excelReport.generated_at}</td>
                                    <td>
                                        <a
                                            href={excelReport.file_path}
                                            className="btn btn-xs btn-primary"
                                        >
                                            <i className="fa fa-download"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>

                        <Pagination
                            prev_page_url={excelReports.prev_page_url}
                            next_page_url={excelReports.next_page_url}
                            current_page={excelReports.current_page}
                            last_page={excelReports.last_page}
                            total={excelReports.total}
                            per_page={excelReports.per_page}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
