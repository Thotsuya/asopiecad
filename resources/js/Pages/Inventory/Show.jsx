import {Head} from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useInventory from "@/Hooks/Inventory";
import NewInventory from "@/Pages/Inventory/NewInventory";
import useToasts from "@/Hooks/Toasts";

export default function Show({auth, inventory}) {

    const {
        data,
        setData,
        errors,
        reset,
        processing,
        storeInventory,
        editMode,
        setEditMode,
        updateInventory
    } = useInventory(inventory, inventory.form)

    const {success,prompt} = useToasts()

    const onSubmit = (e) => {
        prompt('¿Desea agregar una reunión?', 'Asegurese de que el formulario esté completo antes de agregar una reunión')
            .then((result) => {
                if (result.isConfirmed) {
                   storeInventory()
                }
            })
    }

    const toggleEditMode = (inventory) => {
        let newData = {...data}

        newData.inventory_item_id = inventory.id

        Object.keys(inventory.form_data).forEach((key) => {
            newData[key] = inventory.form_data[key]
        })

        setData(newData)
        setEditMode(true)

    }

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title={`Inventario: ${inventory.title}`}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <h4 className="box-title">Inventario: {inventory.title}</h4>
                        </div>
                    </div>
                </div>

                <NewInventory
                    form={inventory.form}
                    data={data}
                    setData={setData}
                    errors={errors}
                />

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            {editMode ? (
                                <div className="row">
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => {
                                                reset()
                                                setEditMode(false)
                                            }}
                                            disabled={processing}
                                            className="btn btn-danger btn-block">
                                            Cancelar
                                            <i className="margin-left-5 fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            onClick={updateInventory}
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
                                    <div className="col-md-12">
                                        <button
                                            onClick={onSubmit}
                                            className="btn btn-primary btn-block">
                                            {
                                                processing ? 'Guardando...' : 'Guardar'
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
                                        {inventory.headers.map((header, index) => (
                                            <th key={`header-${index}`}>{header}</th>
                                        ))}
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {inventory.inventory_items.length > 0 ? (
                                        inventory.inventory_items.map((inven, index) => (
                                            <tr key={`participant-${index}`}>
                                                {Object.values(inven.form_data).map((value, index) => (
                                                    <td key={`value-${index}`}>
                                                        {
                                                            // If the value is an array, print the values separated by comma
                                                            Array.isArray(value) ? value.join(', ') : value.length > 20 ? value.substring(0, 20) + '...' : value
                                                        }
                                                    </td>
                                                ))}
                                                <td className="text-center">
                                                    <button
                                                        onClick={() => toggleEditMode(inven)}
                                                        className="btn btn-warning btn-sm">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={inventory.headers.length + 1} className="text-center">
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
