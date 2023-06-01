import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, useForm} from '@inertiajs/inertia-react'
import ParticipantRow from "@/Pages/Meetings/Partials/ParticipantRow";
import NewParticipant from "@/Pages/Meetings/Partials/NewParticipant";
import useToasts from "@/Hooks/Toasts";

export default function Edit({auth, meeting}){

    const {data, setData, post, put,processing, errors, reset} = useForm({
        id: meeting.id,
        uuid: meeting.uuid,
        title: meeting.title,
        project_id: meeting.project_id,
        participants: meeting.participants,
    })

    const {success,error} = useToasts()

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('meetings.update', meeting.uuid), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success('Reunión actualizada con éxito');
                reset();
            },
            onError: (err) => {
                console.log(err)
                error('Error al actualizar la reunión');
            },
        });
    }

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title={`Reunión: ${meeting.title}`} />

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <h4 className="box-title">Editar Reunión</h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="title">
                                            Título de la reunión
                                            <button
                                                onClick={onSubmit}
                                                className="btn btn-xs btn-primary">
                                                <i className="fa fa-save"></i>
                                            </button>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            placeholder="Título de la reunión"
                                            value={data.title}
                                            onChange={(e) => {
                                                setData((data) => ({
                                                    ...data,
                                                    title: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>

                                <NewParticipant meeting={meeting}/>


                            </div>
                        </div>
                    </div>


                    <div className="col-md-12">
                        <div className="box-content">
                            <h4 className="box-title">Participantes</h4>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th className="text-center">Cédula</th>
                                    <th className="text-center">Ultima Reunión</th>
                                    <th className="text-center">Fecha Nueva Reunion</th>
                                    <th className="text-center">Cantidad de reuniones</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {meeting.participants.length > 0 ? (
                                        <>
                                            {meeting.participants.map((participant,index) => (
                                                <ParticipantRow
                                                    key={participant.id}
                                                    participant={participant}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No hay participantes
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
        </>
    )
}
