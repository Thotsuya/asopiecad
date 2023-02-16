import useGoals from '@/Hooks/Goals'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import Conditions from '@/Components/Goals/Conditions'

export default function GoalsCreateModal({ project, programs }) {
    const [options, setOptions] = useState([])
    const [forms, setForms] = useState([])
    const [program, setProgram] = useState([])

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

    const {
        data,
        processing,
        errors,
        setData,
        handleGoalSubmit,
        handleNewCondition,
        handleRemoveCondition,
        handleNewConditionItem,
    } = useGoals(project)

    useEffect(() => {
        if (data) {
            const program = programs.find(
                (program) => program.id === data.program_id
            )
            setForms(() => {
                // Find the program whose program id matches the program id in the data
                return program?.forms?.map((form) => {
                    return {
                        value: form.id,
                        label: form.form_name,
                    }
                })
            })

            setProgram(program)
        }
    }, [data.program_id])

    return (
        <div
            className="modal fade"
            id="modal-register-goal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-register-goal-label"
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-register-goal-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-register-goal-label"
                        >
                            Registrar nuevo objetivo{' '}
                            <i className="fa fa-flag" />
                        </h4>
                    </div>
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
                                    onClick={handleNewCondition}
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
                                        estos campos se mostraran en el reporte
                                        de avance del mismo. Puedes dejar en
                                        blanco estos campos si no deseas agregar
                                        campos a tu objetivo.
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
                                    handleRemoveCondition(index)
                                }}
                                handleNewConditionItem={() => {
                                    handleNewConditionItem(index)
                                }}
                            />
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            onClick={handleGoalSubmit}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <i className="fa fa-spinner fa-spin" />{' '}
                                    Guardando...
                                </>
                            ) : (
                                'Guardar'
                            )}{' '}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
