import { useState } from "react";

export default function ProjectTitleHeaderAndForm({
    project,
    onProjectNameChange,
    onProjectDescriptionChange,
}) {
    const [editProjectName, setEditProjectName] = useState(false);
    const [editProjectDescription, setEditProjectDescription] = useState(false);

    return (
        <div className="row">
            <div className="col-lg-12 col-xs-12">
                {editProjectName ? (
                    <>
                        <input
                            type="text"
                            className="form-control form-control-alt"
                            value={project.project_name}
                            onChange={onProjectNameChange}
                        />{" "}
                    </>
                ) : (
                    <>
                        <h1 className="page-title">
                            Proyecto: <strong>{project.project_name}</strong>
                        </h1>{" "}
                    </>
                )}
                <button
                    className={`btn btn-xs btn-${
                        editProjectName ? "danger" : "primary"
                    } waves-effect waves-ligt`}
                    onClick={() =>
                        setEditProjectName(
                            (editProjectName) => !editProjectName
                        )
                    }
                >
                    {editProjectName ? (
                        <i className="fa fa-times" />
                    ) : (
                        <i className="fa fa-pencil" />
                    )}
                </button>
            </div>
            <div className="col-lg-12 col-xs-12">
                <p className="font-13">
                    {editProjectDescription ? (
                        <>
                            <input
                                type="text"
                                className="form-control form-control-alt"
                                value={project.project_description}
                                onChange={onProjectDescriptionChange}
                            />{" "}
                        </>
                    ) : (
                        <>{project.project_description ?? "Sin descripción"} </>
                    )}

                    <button
                        className={`btn btn-xs btn-${
                            editProjectDescription ? "danger" : "primary"
                        } waves-effect waves-ligt`}
                        onClick={() =>
                            setEditProjectDescription(
                                (editProjectDescription) =>
                                    !editProjectDescription
                            )
                        }
                    >
                        {editProjectDescription ? (
                            <i className="fa fa-times" />
                        ) : (
                            <i className="fa fa-pencil" />
                        )}
                    </button>
                </p>
            </div>
        </div>
    );
}
