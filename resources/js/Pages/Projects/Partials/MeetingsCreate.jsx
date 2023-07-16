import Select from "react-select";

export default function MeetingsCreate({data, setData, project, forms, onSubmit}){

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
                        <div className="form-group">
                            <label htmlFor="meeting_target">
                                Meta de Reuniones
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="meeting_target"
                                placeholder="Meta de Reuniones"
                                value={data.meeting_target}
                                onChange={(e) => {
                                    setData((data) => ({
                                        ...data,
                                        meeting_target: e.target.value
                                    }))

                                }}
                            />
                        </div>
                    </div>

                   <div className="col-xs-12">
                        <div className="form-group">
                            <label htmlFor="form_id">
                                Formulario
                            </label>

                            <Select
                                id="form_id"
                                name="form_id"
                                options={forms.map((form) => ({
                                    value: form.id,
                                    label: form.form_name
                                }))}
                                onChange={(option) => {
                                    setData((data) => ({
                                        ...data,
                                        form_id: option.value
                                    }))
                                }}
                            />

                        </div>
                   </div>

                    <div className="col-xs-12">
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={onSubmit}
                            >
                                Crear reunión
                            </button>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}
