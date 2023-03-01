import { useForm } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import Conditions from '@/Components/Goals/Conditions'
import useToasts from '@/Hooks/Toasts'

export default function GoalEditModal({ goal, programs }) {
    const { data, setData, errors, put, processing } = useForm({
        goal_description: '',
        goal_target: 0,
        program_id: null,
        conditions: [],
    })

    const [options, setOptions] = useState([])
    const [forms, setForms] = useState([])
    const [program, setProgram] = useState([])

    const { success, error } = useToasts()

    useEffect(() => {
        setOptions(
            programs.map((program) => {
                return {
                    value: program.id,
                    label: program.program_name,
                }
            })
        )
    }, [])

    useEffect(() => {
        setData({
            goal_description: goal?.goal_description ?? '',
            goal_target: goal?.goal_target ?? 0,
            program_id: goal?.program_id ?? null,
            conditions: goal?.conditions ?? [],
        })

        const program = programs.find(
            (program) => program.id === goal?.program_id
        )
        setProgram(program)

        setForms(() => {
            return program?.forms.map((form) => {
                return {
                    value: form.id,
                    label: form.form_name,
                }
            })
        })
    }, [goal])

    const handleSubmit = () => {
        put(route('goals.update', goal.id), {
            preserveScroll: true,
            onSuccess: () => {
                success('Meta actualizada correctamente')
                $('#modal-edit-goal').modal('hide')
            },
        })
    }

    return (
        <div
            className="modal fade"
            id="modal-edit-goal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-edit-goal-label"
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-edit-goal-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title" id="modal-edit-goal-label">
                            Editar meta <i className="fa fa-flag-checkered" />
                        </h4>
                    </div>

                    {goal && (
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div
                                        className={
                                            errors.goal_description
                                                ? 'form-group has-error'
                                                : 'form-group'
                                        }
                                    >
                                        <label htmlFor="goal_name">
                                            Descripcion del Objetivo
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="goal_name"
                                            placeholder="Escribe una breve descripcion del objetivo"
                                            value={data.goal_description}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    goal_description:
                                                        e.target.value,
                                                })
                                            }}
                                        />
                                        {errors.goal_description && (
                                            <span className="help-block">
                                                {errors.goal_description}
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            errors.goal_target
                                                ? 'form-group has-error'
                                                : 'form-group'
                                        }
                                    >
                                        <label htmlFor="goal_target">
                                            Meta del Proyecto Pluri-Annual
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="goal_target"
                                            min={0}
                                            placeholder="Escribe la meta a alcanzar en números"
                                            value={data.goal_target}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    goal_target: e.target.value,
                                                })
                                            }}
                                        />
                                        {errors.goal_target && (
                                            <span className="help-block">
                                                {errors.goal_target}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="goal_program">
                                            Vincular a un programa
                                        </label>

                                        <Select
                                            options={options}
                                            placeholder="Programas"
                                            isSearchable
                                            noOptionsMessage={() =>
                                                'No hay opciones'
                                            }
                                            value={options.find((option) => {
                                                return (
                                                    option.value ===
                                                    data.program_id
                                                )
                                            })}
                                            onChange={(option) => {
                                                setData((data) => ({
                                                    ...data,
                                                    program_id: option.value,
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-xs-12">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-block"
                                    >
                                        Agregar Campos
                                    </button>
                                </div>
                            </div>

                            <div className="row margin-top-15">
                                <div className="col-xs-12">
                                    <div className="alert alert-info">
                                        <p>
                                            <i className="fa fa-info-circle" />{' '}
                                            Puedes agregar campos a tu objetivo,
                                            estos campos se mostraran en el
                                            reporte de avance del mismo. Puedes
                                            dejar en blanco estos campos si no
                                            deseas agregar campos a tu objetivo.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {data.conditions.map((condition, index) => (
                                <Conditions
                                    key={index}
                                    options={forms}
                                    program={program}
                                    fieldIndex={index}
                                    setData={setData}
                                    condition={condition}
                                    handleRemoveCondition={() => {
                                        {
                                        }
                                    }}
                                    handleNewConditionItem={() => {
                                        {
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div className="modal-footer">
                        <button
                            id="modal-edit-goal-close"
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={processing}
                        >
                            {processing ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
