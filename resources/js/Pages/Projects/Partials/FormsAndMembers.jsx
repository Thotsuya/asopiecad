import { useState } from "react";

export default function FormsAndMembers({
    forms,
    users,
    project,
    onMemberSelect,
    onFormSelect,
    onMemberRemove,
}) {
    const [member, setMember] = useState({
        id: users[0].id,
        name: users[0].name,
    });

    const handleMemberSelect = (e) => {
        const selectedMember = users.find(
            (user) => user.id === parseInt(e.target.value)
        );
        setMember({
            id: selectedMember.id,
            name: selectedMember.name,
        });
    };

    const handleMemberAdd = () => {
        // Remove the selected member from the users list
        const newUsers = users.filter((user) => user.id !== member.id);
        // Add the selected member to the project users list
        onMemberSelect(member);
        // Set the member to the first user in the new users list

        setMember({
            id: newUsers[0].id,
            name: newUsers[0].name,
        });
    };

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="box-content">
                    <h4>Formularios</h4>
                    <p>
                        Selecciona el formulario que será utilizado para
                        registrar a los beneficiarios del proyecto.
                    </p>
                    <select
                        className="form-control"
                        onChange={(e) => onFormSelect(parseInt(e.target.value))}
                        defaultValue={project.form_id}
                    >
                        <option value="" disabled>
                            Selecciona un formulario
                        </option>
                        {forms.map((form) => (
                            <option key={form.id} value={form.id}>
                                {form.form_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="box-content">
                    <h4>Miembros del proyecto</h4>
                    <p className="font-13">
                        Estos son los usuarios que tienen acceso al proyecto.
                        Selecciona un usuario para asignarlo al proyecto.
                    </p>
                    <select
                        className="form-control"
                        onChange={handleMemberSelect}
                    >
                        <option value="" disabled>
                            Selecciona un usuario
                        </option>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <option
                                    key={user.id}
                                    value={user.id}
                                    defaultValue={index === 0}
                                >
                                    {user.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                No hay usuarios disponibles
                            </option>
                        )}
                    </select>
                    <div className="margin-top-10">
                        <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            onClick={handleMemberAdd}
                            disabled={users.length === 0}
                        >
                            <i className="fa fa-plus" /> Agregar
                        </button>
                    </div>

                    <div className="margin-top-10">
                        <ul className="list-group">
                            {project.users.map((user) => (
                                <li key={user.id} className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-10 col-xs-12">
                                            {user.name}
                                        </div>
                                        <div className="col-lg-2 col-xs-12">
                                            <button
                                                className="btn btn-danger btn-xs pull-right"
                                                onClick={() => {
                                                    onMemberRemove(user);
                                                }}
                                            >
                                                <i className="fa fa-trash" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
