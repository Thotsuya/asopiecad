import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/inertia-react'

export default function Dashboard({ auth, project, forms }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Configurar reportes" />
            {console.log(forms)}
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
                <div className="col-xs-12 col-md-4">
                    <div className="box-content">
                        <h4 className="box-title">Formularios</h4>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
