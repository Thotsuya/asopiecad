import {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";

export default function ParticipantRow({participant,index}){

    const {data, setData, put, processing, errors, reset} = useForm({
        id: participant.id,
        name: participant.name,
        document: participant.document,
        date: new Date().toISOString().split('T')[0],
    })

    const {success,error,prompt} = useToasts()

    const onSubmit = () => {
        prompt('¿Deseas guardar los cambios?', 'Se añadirá al contador de reuniones de este participante')
            .then((result) => {
                if (result.isConfirmed) {
                    put(route('participants.update', participant.id), {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            success('Participante actualizado con éxito');
                        },
                        onError: (err) => {
                            console.log(err)
                            error('Error al actualizar el participante');
                        },
                    });
                }
            })
    }

    return (
        <>
            <tr>
                <td>{participant.name}</td>
                <td className="text-center">
                    <input
                        type="text"
                        className="form-control"
                        id="document"
                        placeholder="Cédula"
                        value={data.document}
                        onChange={(e) => {
                            setData((data) => ({
                                ...data,
                                document: e.target.value
                            }))
                        }}
                    />
                </td>
                <td className="text-center">{participant.last_meeting_date ?? participant.date}</td>
                <td>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        placeholder="Fecha de reunión"
                        value={data.date}
                        onChange={(e) => {
                            setData((data) => ({
                                ...data,
                                date: e.target.value
                            }))
                        }}
                    />
                </td>
                <td className="text-center">{participant.total_meetings}</td>
                <td className="text-center">
                    <button
                        onClick={onSubmit}
                        className="btn btn-info btn-xs">
                        <i className="fa fa-save"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}
