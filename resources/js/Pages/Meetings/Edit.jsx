import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, useForm} from '@inertiajs/inertia-react'
import ParticipantRow from "@/Pages/Meetings/Partials/ParticipantRow";
import NewParticipant from "@/Pages/Meetings/Partials/NewParticipant";
import useMeetings from "@/Hooks/Meetings";
import {useCallback, useEffect, useState} from "react";
import useToasts from "@/Hooks/Toasts";

export default function Edit({auth, meeting}) {

    const {
        data,
        setData,
        errors,
        processing,
        storeMeeting,
        clearForm,
        updateMeeting,
        editMode,
        setEditMode
    } = useMeetings(meeting, meeting.form)

    const { prompt } = useToasts();

    const [addOneMeetingValue, setAddOneMeetingValue] = useState(false)

    const toggleAddOneMeeting = (addOneMeeting) => {
        setData((data) => ({
            ...data,
            add_one_meeting: addOneMeeting
        }))

        setAddOneMeetingValue(addOneMeeting)
    }

    useEffect(() => {
        if(addOneMeetingValue === data.add_one_meeting) {
            prompt('¿Desea agregar una reunión?', 'Asegurese de que el formulario esté completo antes de agregar una reunión')
                .then((result) => {
                    if (result.isConfirmed) {
                        storeMeeting()
                    }
                })
        }
    }, [addOneMeetingValue])

    const toggleEditMode = (participant) => {
        let newData = {...data}

        newData.participant_id = participant.id
        newData.add_one_meeting = false

        Object.keys(participant.form_data).forEach((key) => {
            newData[key] = participant.form_data[key]
        })

        setData(newData)
        setEditMode(true)

    }

    const resetEditMode = () => {
        setEditMode(false)
        clearForm()
    }



    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title={`Reunión: ${meeting.title}`}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <h4 className="box-title">Editar Reunión</h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="title">
                                            Título de la reunión
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            placeholder="Título de la reunión"
                                            value={data.title}
                                            disabled={true}
                                            onChange={(e) => {
                                                setData((data) => ({
                                                    ...data,
                                                    title: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="count">
                                            Cantidad de reuniones realizadas <strong>({meeting.total_meetings})</strong>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <NewParticipant form={meeting.form} data={data} setData={setData} errors={errors}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            {editMode ? (
                                <div className="row">
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => resetEditMode()}
                                            disabled={processing}
                                            className="btn btn-danger btn-block">
                                            Cancelar
                                            <i className="margin-left-5 fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => updateMeeting()}
                                            disabled={processing}
                                            className="btn btn-success btn-block">
                                            {
                                                processing ? 'Guardando...' : 'Guardar cambios'
                                            }
                                            <i className="margin-left-5 fa fa-save"></i>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => toggleAddOneMeeting(true)}
                                            className="btn btn-primary btn-block">
                                            {
                                                processing ? 'Guardando...' : 'Guardar y sumar 1 reunión'
                                            }
                                            <i className="margin-left-5 fa fa-save"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => toggleAddOneMeeting(false)}
                                            className="btn btn-danger btn-block">
                                            {
                                                processing ? 'Guardando...' : 'Guardar sin sumar reunión'
                                            }
                                            <i className="margin-left-5 fa fa-save"></i>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <h4 className="box-title">Registros</h4>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        {meeting.headers.map((header, index) => (
                                            <th key={`header-${index}`}>{header}</th>
                                        ))}
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {meeting.participants.length > 0 ? (
                                        meeting.participants.map((participant, index) => (
                                                <tr key={`participant-${index}`}>
                                                    {Object.values(participant.form_data).map((value, index) => (
                                                        <td key={`value-${index}`}>
                                                            {
                                                                // If the value is an array, print the values separated by comma
                                                                Array.isArray(value) ? value.join(', ') : value.length > 20 ? value.substring(0, 20) + '...' : value
                                                            }
                                                        </td>
                                                    ))}
                                                    <td className="text-center">
                                                        <button
                                                            onClick={() => toggleEditMode(participant)}
                                                            className="btn btn-warning btn-sm">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan={meeting.headers.length + 1} className="text-center">
                                                No hay registros
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
        </>
    )
}
