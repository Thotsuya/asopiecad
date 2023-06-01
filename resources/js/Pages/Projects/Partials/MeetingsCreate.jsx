export default function MeetingsCreate({data, setData, project, onSubmit}){

    const addParticipant = (e) => {
        e.preventDefault();
        setData((data) => ({
            ...data,
            participants: [
                ...data.participants,
                {
                    name: '',
                    document: '',
                    date: new Date().toISOString().split('T')[0],
                    count: 1
                }
            ],
        }))
    }

    return (
        <div className="col-md-4">
            <div className="box-content">
                <h4 className="box-title">Reuniones</h4>

                <div className="row">
                    <div className="col-xs-12">
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
                                onChange={(e) => {
                                    setData((data) => ({
                                        ...data,
                                        title: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <button
                            className="btn btn-info btn-sm btn-block waves-effect waves-light"
                            onClick={addParticipant}
                        >
                            Agregar Participante
                        </button>
                    </div>
                </div>

                <div className="row margin-top-15">
                    <div className="col-xs-12">
                        <h4 className="box-title">Participantes</h4>
                    </div>

                    {data.participants.map((participant, index) => (
                        <>
                            <div className="col-xs-12" key={index}>
                                <div className="box-content bg-lightdark">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Nombre"
                                            value={participant.name}
                                            onChange={(e) => {
                                                setData((data) => ({
                                                    ...data,
                                                    participants: data.participants.map((p, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...p,
                                                                name: e.target.value
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                }))
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="document">
                                            Cédula (opcional)
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="document"
                                            placeholder="Cédula"
                                            value={participant.document}
                                            onChange={(e) => {
                                                setData((data) => ({
                                                    ...data,
                                                    participants: data.participants.map((p, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...p,
                                                                document: e.target.value
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                }))
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="date">
                                            Fecha de reunión
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            placeholder="Fecha de reunión"
                                            value={participant.date}
                                            onChange={(e) => {
                                                setData((data) => ({
                                                    ...data,
                                                    participants: data.participants.map((p, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...p,
                                                                date: e.target.value
                                                            }
                                                        }
                                                        return p;
                                                    })
                                                }))
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button
                                            className="btn btn-danger btn-sm btn-block waves-effect waves-light"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData((data) => ({
                                                    ...data,
                                                    participants: data.participants.filter((p, i) => i !== index)
                                                }))
                                            }
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </>
                    ))}

                    <div className="col-xs-12">
                        <button
                            className="btn btn-success btn-sm btn-block waves-effect waves-light"
                            onClick={onSubmit}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}
