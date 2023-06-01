import {Link, useForm} from "@inertiajs/inertia-react";
import MeetingsCreate from "@/Pages/Projects/Partials/MeetingsCreate";
import useToasts from "@/Hooks/Toasts";

export default function MeetingsTab({project, meetings}) {


    const {data, setData, post, processing, errors, reset} = useForm({
        title: '',
        project_id: project.id,
        participants: [],
    });

    const {success, error} = useToasts()

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('meetings.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success('Reunión creada con éxito');
                reset();
            },
            onError: (err) => {
                console.log(err)
                error('Error al crear la reunión');
            },
        });
    }

    return (
        <>
            <div
                className="tab-pane fade"
                role="tabpanel"
                id="meeting"
                aria-labelledby="profile-tab"
            >
                <div className="row">
                    <MeetingsCreate
                        data={data}
                        setData={setData}
                        onSubmit={onSubmit}
                        project={project}/>

                    <div className="col-md-8">
                        <div className="box-content">
                            <h4 className="box-title">Reuniones</h4>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Título</th>
                                    <th className="text-center">Cantidad de reuniones</th>
                                    <th className="text-center">Participantes</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                                </thead>

                                <tbody>
                                {meetings.total > 0 ? (
                                    meetings.data.map((meeting) => (
                                        <tr key={meeting.uuid}>
                                            <td>{meeting.title}</td>
                                            <td className="text-center">{meeting.total_meetings}</td>
                                            <td className="text-center">{meeting.participants_count}</td>
                                            <td className="text-center">
                                                <Link href={route('meetings.edit', meeting.uuid)}>
                                                    <button className="btn btn-warning btn-xs waves-effect waves-light">
                                                        <i className="fa fa-eye"/>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No hay reuniones registradas
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
