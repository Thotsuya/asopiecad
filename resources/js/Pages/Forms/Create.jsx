import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { FIELD_SIZE, FORMS_TYPES } from "@/Constants/Forms";
import { useEffect, useState } from "react";
import LargeInput from "@/Pages/Forms/Fields/LargeInput";
import SmallInput from "@/Pages/Forms/Fields/SmallInput";
import CheckboxInput from "@/Pages/Forms/Fields/CheckboxInput";
import SelectInput from "@/Pages/Forms/Fields/SelectInput";
import RadioInput from "@/Pages/Forms/Fields/RadioInput";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";

export default function Create(props) {
    const [option, setOption] = useState("");
    const [tab, setTab] = useState("");

    const { success, error } = useToasts();

    const { data, setData, post, processing, errors, reset } = useForm({
        form_name: "",
        tabs: [],
        fields: [],
    });

    const [field, setField] = useState({
        name: "",
        type: "text",
        required: false,
        size: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
        tab_id: data.tabs.length > 0 ? data.tabs[0].id : "1",
        options: [],
    });

    const handleFormSubmit = (e) => {
        post(route("forms.store"), {
            onSuccess: () => {
                success("Formulario creado correctamente");
            },
            onError: () => {
                error("Error al crear el formulario");
            },
        });
    };

    const addTabToForm = () => {
        setData({
            ...data,
            tabs: [
                ...data.tabs,
                {
                    id:
                        data.tabs.length > 0
                            ? parseInt(data.tabs[data.tabs.length - 1].id) + 1
                            : 1,
                    name: tab,
                    slug: tab.toLowerCase().replace(/ /g, "-"),
                    editMode: false,
                    order:
                        data.tabs.length > 0
                            ? data.tabs[data.tabs.length - 1].order + 1
                            : 1,
                },
            ],
        });
        setTab("");
    };

    const toggleTabEditMode = (tabId) => {
        setData({
            ...data,
            tabs: data.tabs.map((tab) => {
                if (tab.id === tabId) {
                    tab.editMode = !tab.editMode;
                }

                return tab;
            }),
        });
    };

    const toggleOptionEditMode = (optionId) => {
        setField((field) => {
            return {
                ...field,
                options: field.options.map((option) => {
                    if (option.id === optionId) {
                        option.editMode = !option.editMode;
                    }

                    return option;
                }),
            };
        });
    };

    const handleTabEdit = (tabId, newName) => {
        setData({
            ...data,
            tabs: data.tabs.map((tab) => {
                if (tab.id === tabId) {
                    tab.name = newName;
                }

                return tab;
            }),
        });
    };

    const handleOptionEdit = (optionId, newName) => {
        setField((field) => {
            return {
                ...field,
                options: field.options.map((option) => {
                    if (option.id === optionId) {
                        option.name = newName;
                    }

                    return option;
                }),
            };
        });
    };

    const handleTabChange = (e) => {
        setTab(e.target.value);
    };

    const handleFieldChange = (e) => {
        setField({
            ...field,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        });
    };

    const handleOptionChange = (e) => {
        setOption(e.target.value);
    };

    const handleFieldOptionsChange = (e) => {
        setField({
            ...field,
            // Keep the old options and add the new one
            options: [
                ...field.options,
                {
                    // Get the last option id and add 1 or 1 if there is no options
                    id:
                        field.options.length > 0
                            ? field.options[field.options.length - 1].id + 1
                            : field.options.length + 1,
                    name: option,
                    value: option.toString().toLowerCase().replace(/ /g, "_"),
                    order: field.options.length + 1,
                    editMode: false,
                },
            ],
        });
    };

    const addFieldToForm = (e) => {
        let fieldSlug = field.name.toLowerCase().replace(/ /g, "_");
        setData({
            ...data,
            fields: [
                ...data.fields,
                {
                    ...field,
                    slug: fieldSlug,
                    id:
                        data.fields.length > 0
                            ? data.fields[data.fields.length - 1].id + 1
                            : 1,
                },
            ],
        });

        setField({
            name: "",
            type: "text",
            required: false,
            size: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
            tab_id: "1",
            options: [],
        });
    };

    const removeOptionFromField = (option) => {
        setField({
            ...field,
            options: field.options
                .filter((item) => item.id !== option.id)
                .map((item, index) => {
                    return { ...item, order: index + 1 };
                })
                .sort((a, b) => a.order - b.order),
        });
    };

    const removeTabFromForm = (tab) => {
        setData({
            ...data,
            tabs: data.tabs
                .filter((item) => item.id !== tab.id)
                .map((item, index) => {
                    return { ...item, order: index + 1 };
                })
                .sort((a, b) => a.order - b.order),
        });
    };

    const removeFieldFromForm = (field) => {
        setData({
            ...data,
            fields: data.fields.filter((item) => item.id !== field.id),
        });
    };

    const buttonEnabled = () => {
        return (
            field.name === "" ||
            field.type === "" ||
            field.size === "" ||
            field.tab_id === "" ||
            ((field.type === "select" || field.type === "select multiple") &&
                field.options.length === 0)
        );
    };

    // Function to update options order on drop
    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;

        let updatedOptions = [...field.options];
        const [removed] = updatedOptions.splice(droppedItem.source.index, 1);

        updatedOptions.splice(droppedItem.destination.index, 0, removed);

        setField({
            ...field,
            options: updatedOptions.map((item, index) => {
                return { ...item, order: index + 1 };
            }),
        });
    };

    const handleTabDrop = (droppedItem) => {
        if (!droppedItem.destination) return;

        let updatedTabs = [...data.tabs];
        const [removed] = updatedTabs.splice(droppedItem.source.index, 1);

        updatedTabs.splice(droppedItem.destination.index, 0, removed);

        setData({
            ...data,
            tabs: updatedTabs.map((item, index) => {
                return { ...item, order: index + 1 };
            }),
        });
    };

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Nuevo Formulario" />

            <div className="row row-inline-block small-spacing">
                <div className="col-lg-4 col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">Nuevo Formulario</h4>
                        <div className="row">
                            <div className="col-lg-12 margin-bottom-10">
                                <label htmlFor="name">Nombre del campo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    onChange={handleFieldChange}
                                    value={field.name}
                                    placeholder="Nombre del campo"
                                />
                            </div>
                            <div className="col-lg-12 margin-bottom-10">
                                <label htmlFor="name">
                                    Selecciona un tipo de campo
                                </label>
                                <select
                                    className="form-control"
                                    id="type"
                                    name="type"
                                    value={field.type}
                                    onChange={handleFieldChange}
                                >
                                    {FORMS_TYPES.map((type) => (
                                        <option key={type.id} value={type.type}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-12 margin-bottom-10">
                                <label htmlFor="name">
                                    Selecciona el tamaño del campo
                                </label>
                                <select
                                    className="form-control"
                                    id="size"
                                    name="size"
                                    value={field.size}
                                    onChange={handleFieldChange}
                                >
                                    {FIELD_SIZE.map((size) => (
                                        <option key={size.id} value={size.size}>
                                            {size.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-lg-12 margin-bottom-10">
                                <label htmlFor="name">
                                    Selecciona la pestana a la que pertenece
                                </label>
                                <select
                                    className="form-control"
                                    id="tab_id"
                                    name="tab_id"
                                    value={field.tab_id}
                                    onChange={handleFieldChange}
                                    disabled={data.tabs.length === 0}
                                >
                                    {data.tabs.length > 0 &&
                                        data.tabs.map((tab) => (
                                            <option key={tab.id} value={tab.id}>
                                                {tab.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {field.type === "select" ||
                            field.type === "select multiple" ? (
                                <>
                                    <div className="col-lg-12 margin-bottom-10">
                                        <label htmlFor="options">
                                            Opciones del campo de selección
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                    </div>
                                    <div className="col-lg-12 margin-bottom-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Escribe una opción y presiona el botón de +"
                                            id="options"
                                            name="options"
                                            onChange={handleOptionChange}
                                        />
                                    </div>
                                    <div className="col-lg-12 margin-bottom-10">
                                        <button
                                            className="btn btn-primary btn-block"
                                            type="button"
                                            onClick={handleFieldOptionsChange}
                                            disabled={option === ""}
                                        >
                                            <i className="fa fa-plus w-full" />
                                        </button>
                                    </div>

                                    <div className="col-lg-12 margin-bottom-10">
                                        {field.options && (
                                            <DragDropContext
                                                onDragEnd={handleDrop}
                                            >
                                                <Droppable droppableId="list-group">
                                                    {(provided) => (
                                                        <div
                                                            className="list-group"
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                        >
                                                            {field.options.map(
                                                                (
                                                                    option,
                                                                    index
                                                                ) => (
                                                                    <Draggable
                                                                        key={
                                                                            option.id
                                                                        }
                                                                        draggableId={option.id.toString()}
                                                                        index={
                                                                            index
                                                                        }
                                                                    >
                                                                        {(
                                                                            provided
                                                                        ) => (
                                                                            <div
                                                                                className="list-group-item"
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <div className="row">
                                                                                    <div className="col-lg-9">
                                                                                        {option.editMode ? (
                                                                                            <>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    id="option_name"
                                                                                                    name="option_name"
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        handleOptionEdit(
                                                                                                            option.id,
                                                                                                            e
                                                                                                                .target
                                                                                                                .value
                                                                                                        )
                                                                                                    }
                                                                                                    value={
                                                                                                        option.name
                                                                                                    }
                                                                                                    placeholder="Nombre de la opción"
                                                                                                />
                                                                                            </>
                                                                                        ) : (
                                                                                            <span>
                                                                                                {
                                                                                                    option.name
                                                                                                }
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="col-lg-3">
                                                                                        <button
                                                                                            className={`btn btn-xs btn-${
                                                                                                option.editMode
                                                                                                    ? "success"
                                                                                                    : "warning"
                                                                                            }
                                                                                            pull-right`}
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                toggleOptionEditMode(
                                                                                                    option.id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {option.editMode ? (
                                                                                                <i className="fa fa-check" />
                                                                                            ) : (
                                                                                                <i className="fa fa-pencil" />
                                                                                            )}
                                                                                        </button>

                                                                                        <button
                                                                                            className="btn btn-danger btn-xs pull-right"
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                removeOptionFromField(
                                                                                                    option
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <i className="fa fa-trash" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                            )}
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
                                        )}
                                    </div>
                                </>
                            ) : null}

                            <div className="col-lg-12">
                                <div className="checkbox primary">
                                    <input
                                        type="checkbox"
                                        id="checkbox-2"
                                        name="required"
                                        onChange={handleFieldChange}
                                    />
                                    <label htmlFor="checkbox-2">
                                        ¿Es requerido?
                                    </label>
                                </div>
                            </div>

                            <div className="col-lg-12 margin-top-10">
                                <button
                                    type="button"
                                    className="btn btn-info btn-submit-prj btn-sm btn-block waves-effect waves-light"
                                    disabled={buttonEnabled()}
                                    onClick={addFieldToForm}
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="box-content">
                        <h4 className="box-title">Pestañas del formulario</h4>
                        <div className="row">
                            <div className="col-lg-12 margin-bottom-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre de la pestaña"
                                    id="tab"
                                    name="tab"
                                    onChange={handleTabChange}
                                    value={tab}
                                />
                            </div>
                            <div className="col-lg-12 margin-bottom-10">
                                <button
                                    className="btn btn-primary btn-block"
                                    type="button"
                                    onClick={addTabToForm}
                                    disabled={tab === ""}
                                >
                                    <i className="fa fa-plus w-full" />
                                </button>
                            </div>
                            <div className="col-lg-12 margin-bottom-10">
                                {data.tabs.length > 0 && (
                                    <DragDropContext onDragEnd={handleTabDrop}>
                                        <Droppable droppableId="list-tab-group">
                                            {(provided) => (
                                                <div
                                                    className="list-group"
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {data.tabs.map(
                                                        (tab, index) => (
                                                            <Draggable
                                                                key={tab.id}
                                                                draggableId={tab.id.toString()}
                                                                index={index}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        className="list-group-item"
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <div className="row">
                                                                            <div className="col-lg-9">
                                                                                {tab.editMode ? (
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Nombre de la pestaña"
                                                                                        id="tab_name"
                                                                                        name="tab_name"
                                                                                        value={
                                                                                            tab.name
                                                                                        }
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            handleTabEdit(
                                                                                                tab.id,
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                ) : (
                                                                                    tab.name
                                                                                )}
                                                                            </div>
                                                                            <div className="col-lg-3">
                                                                                <button
                                                                                    className="btn btn-danger btn-xs pull-right"
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        removeTabFromForm(
                                                                                            tab
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <i className="fa fa-trash" />
                                                                                </button>
                                                                                <button
                                                                                    className={`btn btn-xs pull-right ${
                                                                                        tab.editMode
                                                                                            ? "btn-success"
                                                                                            : "btn-info"
                                                                                    }`}
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        toggleTabEditMode(
                                                                                            tab.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {tab.editMode ? (
                                                                                        <i className="fa fa-check" />
                                                                                    ) : (
                                                                                        <i className="fa fa-pencil" />
                                                                                    )}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    )}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">Previsualización</h4>
                        <ul className="nav nav-tabs" id="myTabs" role="tablist">
                            {data.tabs
                                .sort((a, b) => a.order - b.order)
                                .map((tab, index) => (
                                    <li
                                        key={tab.id}
                                        role="presentation"
                                        className={index === 0 ? "active" : ""}
                                    >
                                        <a
                                            href={`#tab-${tab.slug}`}
                                            id={`tab-${tab.slug}-tab`}
                                            role="tab"
                                            data-toggle="tab"
                                            aria-controls={`tab-${tab.slug}`}
                                            aria-expanded="true"
                                        >
                                            {tab.name}
                                        </a>
                                    </li>
                                ))}
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            {data.tabs
                                .sort((a, b) => a.order - b.order)
                                .map((tab, index) => (
                                    <>
                                        <div
                                            key={tab.id}
                                            role="tabpanel"
                                            className={`tab-pane fade ${
                                                index === 0 ? "active in" : ""
                                            }
                                            `}
                                            id={`tab-${tab.slug}`}
                                            aria-labelledby={`tab-${tab.slug}-tab`}
                                        >
                                            <div className="row">
                                                {data.fields
                                                    .filter(
                                                        (field) =>
                                                            parseInt(
                                                                field.tab_id
                                                            ) === tab.id
                                                    )
                                                    .map((field, index) => {
                                                        if (
                                                            field.type ===
                                                            "textarea"
                                                        ) {
                                                            return (
                                                                <LargeInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    onClick={() =>
                                                                        removeFieldFromForm(
                                                                            field
                                                                        )
                                                                    }
                                                                />
                                                            );
                                                        }

                                                        if (
                                                            field.type ===
                                                            "checkbox"
                                                        ) {
                                                            return (
                                                                <CheckboxInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    onClick={() =>
                                                                        removeFieldFromForm(
                                                                            field
                                                                        )
                                                                    }
                                                                />
                                                            );
                                                        }

                                                        if (
                                                            field.type ===
                                                                "select" ||
                                                            field.type ===
                                                                "select multiple"
                                                        ) {
                                                            return (
                                                                <SelectInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    onClick={() =>
                                                                        removeFieldFromForm(
                                                                            field
                                                                        )
                                                                    }
                                                                />
                                                            );
                                                        }

                                                        if (
                                                            field.type ===
                                                            "radio"
                                                        ) {
                                                            return (
                                                                <RadioInput
                                                                    key={index}
                                                                    field={
                                                                        field
                                                                    }
                                                                    onClick={() =>
                                                                        removeFieldFromForm(
                                                                            field
                                                                        )
                                                                    }
                                                                />
                                                            );
                                                        }

                                                        return (
                                                            <SmallInput
                                                                key={index}
                                                                field={field}
                                                                onClick={() =>
                                                                    removeFieldFromForm(
                                                                        field
                                                                    )
                                                                }
                                                            />
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    </>
                                ))}
                        </div>
                        <div className="row margin-top-15 gap">
                            <div className="col-lg-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del Formulario"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            form_name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-lg-4">
                                <button
                                    className="btn btn-primary btn-block"
                                    type="button"
                                    disabled={
                                        data.fields.length === 0 &&
                                        data.form_name === ""
                                    }
                                    onClick={handleFormSubmit}
                                >
                                    {processing ? (
                                        <>
                                            Guardando{" "}
                                            <i className="fa fa-spin fa-spinner" />
                                        </>
                                    ) : (
                                        "Guardar Formulario"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
