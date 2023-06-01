import {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";

export default function NewParticipant({meeting}) {

    const [newParticipant, setNewParticipant] = useState(false)

    const {data, setData, post, processing, errors, reset} = useForm({
        meeting_id: meeting.id,
        name: '',
        document: '',
        date: new Date().toISOString().split('T')[0],
    })

    const {success,error} = useToasts()

    const onSubmit = () => {
        post(route('participants.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success('Participante agregado con éxito');
                reset()
                setNewParticipant(false)
            },
            onError: (err) => {
                console.log(err)
                error('Error al agregar el participante');
            },
        });
    }

    return (
        <>
            <div className="col-md-12">
                <div className="form-group">
                    <button
                        className={"btn btn-info btn-sm btn-block waves-effect waves-light" + (newParticipant ? ' btn-danger' : '')}
                        onClick={(e) => {
                            setNewParticipant((newParticipant) => !newParticipant)
                        }}
                    >
                        {newParticipant ? 'Cancelar' : 'Agregar Participante'}
                    </button>
                </div>
            </div>

            {newParticipant && (
                <>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="name">
                                Nombre del participante
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Nombre del participante"
                                value={data.name}
                                onChange={(e) => {
                                    setData((data) => ({
                                        ...data,
                                        name: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="document">
                                Cédula del participante (opcional)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="document"
                                placeholder="Cédula del participante"
                                value={data.document}
                                onChange={(e) => {
                                    setData((data) => ({
                                        ...data,
                                        document: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">
                                Fecha de la reunión
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                placeholder="Fecha de la reunión"
                                value={data.date}
                                onChange={(e) => {
                                    setData((data) => ({
                                        ...data,
                                        date: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <button
                                className="btn btn-success btn-sm btn-block waves-effect waves-light"
                                disabled={processing}
                                onClick={onSubmit}
                            >
                                {processing ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
