import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Programs({
    programs,
    onProgramAdd,
    toggleProgramEdit,
    onProgramEdit,
    onProgramDelete,
    handleDrop,
}) {
    const [program, setProgram] = useState("");
    return (
        <div className="box-content">
            <h4>Programas</h4>
            <input
                type="text"
                className="form-control"
                placeholder="Nombre del programa"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
            />
            <button
                className="btn btn-primary btn-block margin-top-10"
                disabled={program.length === 0}
                onClick={() => onProgramAdd(program)}
            >
                Agregar programa
            </button>

            <div className="margin-top-10">
                {programs.length > 0 ? (
                    <DragDropContext onDragEnd={handleDrop}>
                        <Droppable droppableId="programs">
                            {(provided) => (
                                <ul
                                    className="list-group"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {programs
                                        .sort((a, b) => a.order - b.order)
                                        .map((program, index) => (
                                            <Draggable
                                                key={program.id}
                                                draggableId={program.id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        className="list-group-item"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="row">
                                                            <div className="col-xs-8 col-lg-10">
                                                                {program.editing ? (
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={
                                                                            program.program_name
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            onProgramEdit(
                                                                                program.id,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            );
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    program.program_name
                                                                )}
                                                            </div>
                                                            <div className="col-xs-4 col-lg-2">
                                                                <button
                                                                    className={`btn btn-${
                                                                        program.editing
                                                                            ? "danger"
                                                                            : "primary"
                                                                    } btn-sm`}
                                                                    onClick={() =>
                                                                        toggleProgramEdit(
                                                                            program.id
                                                                        )
                                                                    }
                                                                >
                                                                    {program.editing ? (
                                                                        <i className="fa fa-times" />
                                                                    ) : (
                                                                        <i className="fa fa-pencil" />
                                                                    )}
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() =>
                                                                        onProgramDelete(
                                                                            program.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa fa-trash" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <li className="list-group-item">
                        No hay programas agregados
                    </li>
                )}
            </div>
        </div>
    );
}
