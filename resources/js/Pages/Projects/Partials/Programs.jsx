import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Select from 'react-select'
import ProgramRow from '@/Pages/Projects/Partials/ProgramRow'

export default function Programs({
    programs,
    draggableEntities,
    onProgramAdd,
    handleDrop,
    forms,
}) {
    const [program, setProgram] = useState({
        program_name: '',
        forms: [],
    })

    const [options, setOptions] = useState([])

    useEffect(() => {
        if (forms) {
            setOptions(
                forms.map((form) => ({
                    value: form.id,
                    label: form.form_name,
                }))
            )
        }
    }, [])

    const handleOptionChange = (options) => {
        setProgram({
            ...program,
            forms: options.map((option) => option.value),
        })
    }

    return (
        <div className="box-content">
            <h4>Programas</h4>
            <div className="row">
                <div className="col-xs-12 col-lg-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre del programa"
                        value={program.program_name}
                        onChange={(e) => {
                            setProgram((program) => ({
                                ...program,
                                program_name: e.target.value,
                            }))
                        }}
                    />
                </div>

                <div className="col-xs-12 col-lg-6">
                    <Select
                        options={options}
                        isMulti
                        isSearchable
                        closeMenuOnSelect={false}
                        noOptionsMessage={() => 'No hay opciones'}
                        placeholder="Selecciona un formulario"
                        onChange={handleOptionChange}
                    />
                </div>

                <div className="col-xs-12 margin-top-10">
                    <button
                        className="btn btn-primary btn-block"
                        disabled={
                            program.name === '' || program.forms.length === 0
                        }
                        onClick={() => onProgramAdd(program)}
                    >
                        Agregar programa
                    </button>
                </div>
            </div>

            <div className="margin-top-10">
                {programs.length > 0 ? (
                    <DragDropContext onDragEnd={handleDrop}>
                        <Droppable droppableId="entities">
                            {(provided) => (
                                <ul
                                    className="list-group"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {draggableEntities
                                        .sort((a, b) => a.order - b.order)
                                        .map((entity, index) => (
                                            <Draggable
                                                key={entity.uuid}
                                                draggableId={entity.uuid}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        className={`list-group-item ${
                                                            entity.type === 'meeting' ? 'bg-warning' : ''
                                                        }`}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <ProgramRow
                                                            program={entity}
                                                            options={options}
                                                            showActions={entity.type === 'program'}
                                                        />
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
    )
}
