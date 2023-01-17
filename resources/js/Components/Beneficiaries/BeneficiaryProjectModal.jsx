import { useForm } from '@inertiajs/inertia-react'
import { useEffect } from 'react'

export default function BeneficiaryProjectModal({ projects, beneficiary }) {
    const { data, setData, post, get, processing, errors, reset } = useForm({
        project_id: projects[0] ? projects[0].uuid : null,
        beneficiary_id: '',
        beneficiary_name: '',
        is_new_beneficiary: false,
    })

    useEffect(() => {
        if (beneficiary) {
            setData({
                project_id: projects[0] ? projects[0].uuid : null,
                beneficiary_id: beneficiary.id,
                beneficiary_name: beneficiary.name,
                is_new_beneficiary: false,
            })
        }
    }, [beneficiary])

    const handleSubmit = (e) => {
        e.preventDefault()
        get(route('projects.forms.create', data.project_id), {
            onSuccess: () => {
                document
                    .getElementById('modal-beneficiary-project-close')
                    .click()
            },
        })
    }

    return (
        <div
            className="modal fade"
            id="modal-beneficiary-project"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-beneficiary-project-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-beneficiary-project-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-register-beneficiary-label"
                        >
                            Registrar Beneficiario en un Proyecto{' '}
                            <i className="fa fa-user-plus" />
                        </h4>
                    </div>
                    <div className="modal-body">
                        {beneficiary && (
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="beneficiary-name">
                                            Nombre del Beneficiario
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="beneficiary-name"
                                            value={data.beneficiary_name}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="project">
                                            Proyecto
                                        </label>
                                        <select
                                            className="form-control"
                                            id="project"
                                            value={data.project_id}
                                            onChange={(e) => {
                                                setData(
                                                    'project_id',
                                                    e.target.value
                                                )
                                            }}
                                        >
                                            {projects.map((project) => (
                                                <option
                                                    key={project.id}
                                                    value={project.uuid}
                                                >
                                                    {project.project_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            onClick={handleSubmit}
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
