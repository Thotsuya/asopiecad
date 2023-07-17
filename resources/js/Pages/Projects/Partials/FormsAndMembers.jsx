import { useState } from 'react'
import useSelect from '@/Hooks/Select'

export default function FormsAndMembers({
    users,
    project,
    onMemberSelect,
    onFormSelect,
    onMemberRemove,
    onFormRemove,
    onProjectDurationChange,
    onProjectStartDateChange,
    onGlobalGoalChange,
    onProjectFeaturedImageChange,
}) {
    const [member, setMember] = useState({
        id: users[0] ? users[0].id : null,
        name: users[0] ? users[0].name : null,
    })

    const handleMemberSelect = (e) => {
        const selectedMember = users.find(
            (user) => user.id === parseInt(e.target.value)
        )

        setMember({
            id: selectedMember.id,
            name: selectedMember.name,
        })
    }

    const handleMemberAdd = () => {
        // Remove the selected member from the users list
        const newUsers = users.filter((user) => user.id !== member.id)
        // Add the selected member to the project users list
        onMemberSelect(member)
        // Set the member to the first user in the new users list

        setMember({
            id: newUsers[0] ? newUsers[0].id : null,
            name: newUsers[0] ? newUsers[0].name : null
        })
    }

    useSelect({
        el: '.select2',
        onChange: onFormSelect,
        onRemove: onFormRemove,
        selected: project.forms ?? [],
    })

    return (
        <div className="row">
            <div className="col-xs-12">
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
                                                    onMemberRemove(user)
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
            <div className="col-xs-12">
                <div className="box-content">
                    <div className="form-group">
                        <label htmlFor="forms">
                            Duración del Proyecto (en años)
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="duration"
                            id="duration"
                            defaultValue={project.project_duration}
                            onChange={onProjectDurationChange}
                        />
                    </div>
                </div>
            </div>
            <div className="col-xs-12">
                <div className="box-content">
                    <div className="form-group">
                        <label htmlFor="start_date">
                            Fecha de Inicio del Proyecto
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="start_date"
                            id="start_date"
                            defaultValue={project.project_start_date}
                            onChange={onProjectStartDateChange}
                        />
                    </div>
                </div>
            </div>

            <div className="col-xs-12">
                <div className="box-content">
                    <div className="form-group">
                        <label htmlFor="global_goal">
                            Objetivo Global del Proyecto
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="global_goal"
                            id="global_goal"
                            defaultValue={project.global_goal}
                            onChange={onGlobalGoalChange}
                        />
                    </div>
                </div>
            </div>

            <div className="col-xs-12">
                <div className="box-content">
                    <div className="form-group">
                        <label htmlFor="featured_image">
                            Imagen Destacada
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            name="featured_image"
                            id="featured_image"
                            onChange={onProjectFeaturedImageChange}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}
