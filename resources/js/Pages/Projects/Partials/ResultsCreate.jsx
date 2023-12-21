import {useForm} from "@inertiajs/inertia-react";
import Select from "react-select";
import useToasts from "@/Hooks/Toasts";

export default function ResultsCreate({project, goals, meetings}){

    const {data, setData, post, processing, errors, reset} = useForm({
        title: '',
        project_id: project.id,
        goals: [],
        meetings: [],
    });

    const {success, error} = useToasts()

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('grouped-results.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                success('Resultado creado con éxito');
                reset();
            },
            onError: (err) => {
                console.log(err)
                error('Error al crear el resultado');
            },
        });
    }

    return (
        <div className="col-md-5">

            <div className="box-content">
                <h4 className="box-title">Resultados Agrupados</h4>

                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        placeholder="Título"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="goals">Metas</label>
                    <Select
                        id="goals"
                        name="goals"
                        isMulti
                        options={goals.map(goal => ({value: goal.id, label: goal.goal_description}))}
                        className={`basic-multi-select ${errors.goals ? 'is-invalid' : ''}`}
                        classNamePrefix="select"
                        onChange={(e) => setData('goals', e.map(goal => goal.value))}
                        closeMenuOnSelect={false}
                        placeholder={'Seleccione las metas que desea agrupar'}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="meetings">Reuniones</label>
                    <Select
                        id="meetings"
                        name="meetings"
                        isMulti
                        options={meetings.map(meeting => ({value: meeting.id, label: meeting.title}))}
                        className={`basic-multi-select ${errors.meetings ? 'is-invalid' : ''}`}
                        classNamePrefix="select"
                        onChange={(e) => setData('meetings', e.map(meeting => meeting.value))}
                        closeMenuOnSelect={false}
                        placeholder={'Seleccione las reuniones que desea agrupar'}
                    />
                </div>

                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={onSubmit}
                        disabled={processing}
                    >
                        {processing ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
