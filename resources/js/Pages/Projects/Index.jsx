import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";

export default function Dashboard(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        project_name: "",
    });

    const [newProject, setNewProject] = useState(false);
    const { success, error } = useToasts();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success("Proyecto creado con éxito");
                setNewProject(false);
            },
            onError: () => {
                error("Error al crear el proyecto");
            },
        });
    };

    return (
        <AuthenticatedLayout auth={props.auth}>
            <Head title="Proyectos" />

            <div className="prj-header margin-bottom-10">
                <button
                    className={`btn btn-submit-prj btn-sm waves-effect waves-light ${
                        newProject ? "btn-danger" : "btn-info"
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
                <div className="result-count">130 Projects</div>
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
                                                "project_name",
                                                e.target.value
                                            );
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
                                                <i className="fa fa-spinner fa-spin" />{" "}
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
                {props.projects && props.projects.length > 0 ? (
                    props.projects.map((project) => (
                        <div
                            key={project.id}
                            className="col-lg-4 col-md-6 col-xs-12 margin-bottom-30"
                        >
                            <Link
                                className="prj-item"
                                href={route("projects.edit", project.uuid)}
                            >
                                <div className="top-project-section">
                                    <div className="project-icon">
                                        <img
                                            src="http://placehold.it/184x170"
                                            alt=""
                                        />
                                    </div>
                                    <h3>{project.project_name}</h3>
                                    <div className="meta">
                                        <p className="author">
                                            by <span>Bold Meida</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="bottom-project-section">
                                    <div className="meta">
                                        <div className="points">
                                            <i className="fa fa-bar-chart" />{" "}
                                            407
                                        </div>
                                        <div className="views">
                                            <i className="fa fa-eye" /> 40.6k
                                        </div>
                                        <div className="views">
                                            <i className="fa fa-users" /> 40.6k
                                        </div>
                                        <span className="feedable-time timeago">
                                            2 years ago
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
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
        </AuthenticatedLayout>
    );
}
