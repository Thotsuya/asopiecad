import {Link, useForm} from "@inertiajs/inertia-react";
import Select from "react-select";
import useToasts from "@/Hooks/Toasts";

export default function InventoryTab({project, forms, inventory}) {

    const {data, setData, post, processing, errors, reset} = useForm({
        title: '',
        form_id: '',
        project_id: project.id,
        goal: 1
    });

    const {success, error} = useToasts();

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('inventory.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                success('Inventario creado correctamente');
            },
            onError: (err) => {
                console.log(err);
                error('No se pudo crear el inventario');
            }
        });
    }


    return (
        <div
            className="tab-pane fade"
            role="tabpanel"
            id="inventory"
            aria-labelledby="inventory-tab"
        >
            <div className="row">
                <div className="col-md-4">
                    <div className="box-content">
                        <h4 className="box-title">Inventario</h4>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="title">
                                        Título del Inventario
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Título del Inventario"
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
                                    <label htmlFor="goal">
                                        Meta
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="goal"
                                        placeholder="Meta"
                                        value={data.goal}
                                        onChange={(e) => {
                                            setData((data) => ({
                                                ...data,
                                                goal: e.target.value
                                            }))
                                        }}
                                    />

                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="form-group">
                                    <button
                                        className="btn btn-block btn-primary"
                                        disabled={processing}
                                        onClick={onSubmit}
                                    >
                                        {processing ? 'Guardando...' : 'Guardar'}
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="box-content">
                        <h4 className="box-title">Inventarios</h4>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Meta</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((inv) => (
                                    <tr key={inv.id}>
                                        <td>{inv.title}</td>
                                        <td>{inv.goal}</td>
                                        <td>
                                            <Link href={route('inventory.show', inv.uuid)} className="btn btn-primary btn-xs">
                                                <i className="fa fa-eye"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
