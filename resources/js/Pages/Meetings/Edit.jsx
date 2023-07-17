import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, useForm} from '@inertiajs/inertia-react'
import ParticipantRow from "@/Pages/Meetings/Partials/ParticipantRow";
import NewParticipant from "@/Pages/Meetings/Partials/NewParticipant";
import useMeetings from "@/Hooks/Meetings";

export default function Edit({auth, meeting}) {

    const {
        data,
        setData,
        errors,
        processing,
        storeMeeting
    } = useMeetings(meeting, meeting.form)

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
                            </div>
                        </div>
                    </div>

                </div>

                <NewParticipant form={meeting.form} data={data} setData={setData} errors={errors}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <div className="row">
                                <div className="col-md-6">
                                    <button
                                        onClick={storeMeeting}
                                        className="btn btn-primary btn-block">
                                        {
                                            processing ? 'Guardando...' : 'Guardar y sumar 1 reunión'
                                        }
                                        <i className="margin-left-5 fa fa-save"></i>
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-danger btn-block">
                                        {
                                            processing ? 'Guardando...' : 'Guardar sin sumar reunión'
                                        }
                                        <i className="margin-left-5 fa fa-save"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <h4 className="box-title">Registros</h4>

                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
        </>
    )
}
