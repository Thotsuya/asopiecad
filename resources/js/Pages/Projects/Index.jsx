import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/inertia-react'
import { useState, useRef } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'
import Pagination from '@/Components/Pagination'
import useUsers from '@/Hooks/Users'
import ProjectCard from '@/Pages/Projects/Partials/ProjectCard'

export default function Dashboard({ auth, projects, roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        project_name: '',
    })

    const [newProject, setNewProject] = useState(false)
    const projectInputRef = useRef(null)
    const { success, error } = useToasts()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        post(route('projects.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success('Proyecto creado con éxito')
                setNewProject(false)
            },
            onError: () => {
                error('Error al crear el proyecto')
            },
        })
    }

    const { can } = useUsers()

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Proyectos" />

            <div className="prj-header margin-bottom-10">
                <button
                    className={`btn btn-submit-prj btn-sm waves-effect waves-light ${
                        newProject ? 'btn-danger' : 'btn-info'
                    }`}
                    onClick={() => setNewProject((newProject) => !newProject)}
                >
                    {newProject ? (
                        <>
                            Cancelar <i className="fa fa-times" />
                        </>
                    ) : (
                        <>
                            Nuevo Proyecto <i className="fa fa-plus" />
                        </>
                    )}
                </button>
                <div className="result-count">{projects.total} Proyectos</div>
            </div>

            {newProject && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="box-content">
                            <div className="row gap">
                                <div className="col-lg-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del Proyecto"
                                        value={data.project_name}
                                        onChange={(e) => {
                                            setData(
                                                'project_name',
                                                e.target.value
                                            )
                                        }}
                                        ref={projectInputRef}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleFormSubmit(e)
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <button
                                        className="btn btn-info btn-sm btn-block waves-effect waves-light"
                                        disabled={
                                            processing || !data.project_name
                                        }
                                        onClick={handleFormSubmit}
                                    >
                                        {processing ? (
                                            <>
                                                <i className="fa fa-spinner fa-spin" />{' '}
                                                Creando Proyecto...
                                            </>
                                        ) : (
                                            <>Crear Proyecto </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="prj-list row">
                {projects.data && projects.data.length > 0 ? (
                    projects.data.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            roles={roles}
                            auth={auth}
                        />
                    ))
                ) : (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="box-content">
                                <div className="alert alert-info">
                                    No hay proyectos creados
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <Pagination
                        current_page={projects.current_page}
                        last_page={projects.last_page}
                        total={projects.total}
                        per_page={projects.per_page}
                        next_page_url={projects.next_page_url}
                        prev_page_url={projects.prev_page_url}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
