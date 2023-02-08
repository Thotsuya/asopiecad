import Select from 'react-select'
import { useState, useEffect, useMemo } from 'react'
import { Inertia } from '@inertiajs/inertia'
import usePrevious from '@/Utils/usePrevious'
import useToasts from '@/Hooks/Toasts'

export default function ProgramRow({ program, options }) {
    const [editProgram, setEditProgram] = useState({
        id: program.id,
        program_name: program.program_name,
        forms: program.forms,
    })

    const [edit, setEdit] = useState(false)
    const previous = usePrevious(edit)
    const { success, error, prompt } = useToasts()

    const ToggleEditMode = () => {
        setEdit((edit) => !edit)
    }

    const setSelectedOptions = (program) => {
        return options.filter((option) => {
            return program.forms.includes(option.value)
        })
    }

    const deleteProgram = (program) => {
        prompt(
            '¿Estás seguro de eliminar este programa?',
            'Esta acción no se puede deshacer'
        ).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(route('projects.programs.destroy', program.id), {
                    onSuccess: () => {
                        success('Programa eliminado')
                    },
                    onError: () => {
                        error('No se pudo eliminar el programa')
                    },
                })
            }
        })
    }

    useEffect(() => {
        if (previous === true && edit === false) {
            Inertia.put(
                route('projects.programs.update', editProgram.id),
                editProgram,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        success('Programa actualizado')
                    },
                    onError: () => {
                        error('Error al actualizar el programa')
                    },
                }
            )
        }
    }, [edit])

    return (
        <div className="row">
            <div className={`col-xs-12 ${edit ? 'col-lg-6' : 'col-lg-10'}`}>
                {edit ? (
                    <input
                        type="text"
                        className="form-control"
                        value={editProgram.program_name}
                        onChange={(e) => {
                            setEditProgram((editProgram) => ({
                                ...editProgram,
                                program_name: e.target.value,
                            }))
                        }}
                    />
                ) : (
                    editProgram.program_name
                )}
            </div>
            {edit && (
                <div className="col-xs-12 col-lg-4">
                    <Select
                        options={options}
                        isMulti
                        isSearchable
                        closeMenuOnSelect={false}
                        noOptionsMessage={() => 'No hay opciones'}
                        defaultValue={setSelectedOptions(program)}
                        placeholder="Selecciona un formulario"
                        onChange={(options) => {
                            setEditProgram((editProgram) => ({
                                ...editProgram,
                                forms: options.map((option) => option.value),
                            }))
                        }}
                    />
                </div>
            )}
            <div className="col-xs-4 col-lg-2">
                <button
                    className={`btn btn-${edit ? 'danger' : 'primary'} btn-sm`}
                    onClick={ToggleEditMode}
                >
                    {edit ? (
                        <i className="fa fa-times" />
                    ) : (
                        <i className="fa fa-pencil" />
                    )}
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    disabled={edit}
                    onClick={() => deleteProgram(program)}
                >
                    <i className="fa fa-trash" />
                </button>
            </div>
        </div>
    )
}
