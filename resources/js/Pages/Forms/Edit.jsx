import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import useUserForms from "@/Hooks/Forms";
import { FIELD_SIZE, FORMS_TYPES } from "@/Constants/Forms";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LargeInput from "@/Pages/Forms/Fields/LargeInput";
import CheckboxInput from "@/Pages/Forms/Fields/CheckboxInput";
import SelectInput from "@/Pages/Forms/Fields/SelectInput";
import RadioInput from "@/Pages/Forms/Fields/RadioInput";
import SmallInput from "@/Pages/Forms/Fields/SmallInput";

export default function Edit({ form, auth }) {
    const {
        field,
        option,
        tab,
        data,
        setData,
        processing,
        handleFieldChange,
        handleOptionChange,
        handleFieldOptionsChange,
        handleOptionEdit,
        handleDrop,
        handleTabDrop,
        handleTabChange,
        handleTabEdit,
        toggleOptionEditMode,
        toggleTabEditMode,
        addFieldToForm,
        buttonEnabled,
        removeOptionFromField,
        removeFieldFromForm,
        removeTabFromForm,
        addTabToForm,
        handleFormEditSubmit,
    } = useUserForms();

    useEffect(() => {
        setData({
            ...data,
            id: form.id,
            form_name: form.form_name,
            fields: form.fields,
            tabs: form.tabs,
        });
    }, []);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Editar Formulario" />

            <div className="row row-inline-block small-spacing">
                <div className="col-lg-4 col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">Editar Formulario</h4>
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
                                    value={data.form_name}
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
                                    onClick={handleFormEditSubmit}
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
