import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, useForm} from '@inertiajs/inertia-react'
import ParticipantRow from "@/Pages/Meetings/Partials/ParticipantRow";
import NewParticipant from "@/Pages/Meetings/Partials/NewParticipant";
import useMeetings from "@/Hooks/Meetings";
import {useCallback, useEffect, useState} from "react";
import useToasts from "@/Hooks/Toasts";
import {Inertia} from "@inertiajs/inertia";
import Select from "react-select";
import {OPERANDS} from '@/Constants/Operators'
import useUsers from "@/Hooks/Users";

export default function Edit({auth, meeting}) {

    const {
        data,
        setData,
        errors,
        processing,
        storeMeeting,
        clearForm,
        updateMeeting,
        editMode,
        setEditMode,
    } = useMeetings(meeting, meeting.form)

    const {prompt} = useToasts();

    const [addOneMeetingValue, setAddOneMeetingValue] = useState(false)
    const [exporting, setExporting] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const {success, error} = useToasts()
    const [meetingData, setMeetingData] = useState(meeting)
    const { can } = useUsers()

    const toggleAddOneMeeting = (addOneMeeting) => {
        setData((data) => ({
            ...data,
            add_one_meeting: addOneMeeting
        }))

        setAddOneMeetingValue(addOneMeeting)
    }

    const onSubmit = (e) => {
        prompt('¿Desea agregar una reunión?', 'Asegurese de que el formulario esté completo antes de agregar una reunión')
            .then((result) => {
                if (result.isConfirmed) {
                    storeMeeting()
                }
            })
    }

    useEffect(() => {
        if (addOneMeetingValue === data.add_one_meeting) {
            prompt('¿Desea agregar una reunión?', 'Asegurese de que el formulario esté completo antes de agregar una reunión')
                .then((result) => {
                    if (result.isConfirmed) {
                        storeMeeting()
                    }
                })
        }
    }, [addOneMeetingValue])

    const toggleEditMode = (participant) => {
        let newData = {...data}

        newData.participant_id = participant.id
        newData.add_one_meeting = false

        Object.keys(participant.form_data).forEach((key) => {
            newData[key] = participant.form_data[key]
        })

        setData(newData)
        setEditMode(true)

    }

    const resetEditMode = () => {
        setEditMode(false)
        clearForm()
    }

    const onMeetingReportExport = () => {
        setExporting(true)
        Inertia.post(route('meetings.export', meeting.uuid), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setExporting(false)
                setIsExporting(true)
                success('El reporte se está exportando, por favor espere')
            },
            onError: () => {
                setExporting(false)
                error('Ha ocurrido un error al exportar el reporte')
            }
        })
    }

    const onNewCondition = () => {

        let conditions = [...meetingData.conditions || []]

        conditions.push({
            label: '',
            target: null,
            form_id: null,
            form_slug: null,
            field_id: null,
            field_slug: null,
            field_type: null,
            field_value: null,
            operand: null,
            order: null
        })

        setMeetingData((meetingData) => ({
            ...meetingData,
            conditions: conditions
        }))
    }

    const handleFieldChange = (e, index) => {

        let field = meeting.form.fields.find((field) => field.id === e.value)

        let conditions = [...meetingData.conditions]

        conditions[index].form_id = meeting.form.id
        conditions[index].form_slug = meeting.form.form_slug
        conditions[index].field_id = field.id
        conditions[index].field_slug = `${field.slug}-${meeting.form.form_slug}-${meeting.form.id}`
        conditions[index].field_type = field.type
        conditions[index].field_value = ''
        conditions[index].order = null

        setMeetingData((meetingData) => ({
            ...meetingData,
            conditions: conditions
        }))
    }

    const handleOperandChange = (option, conditionIndex) => {

        let conditions = [...meetingData.conditions]

        conditions[conditionIndex].operand = option.value

        setMeetingData((meetingData) => ({
            ...meetingData,
            conditions: conditions
        }))
    }


    const handleTargetChange = (e, conditionIndex) => {

            let conditions = [...meetingData.conditions]

            conditions[conditionIndex].target = e.target.value

            setMeetingData((meetingData) => ({
                ...meetingData,
                conditions: conditions
            }))
    }

    const handleValueChange = (e, conditionIndex) => {

        let conditions = [...meetingData.conditions]

        if(conditions[conditionIndex].field_type === 'select') {
            conditions[conditionIndex].field_value = e.map((option) => option.value)
        } else {
            conditions[conditionIndex].field_value = e.target.value || ''
        }

        setMeetingData((meetingData) => ({
            ...meetingData,
            conditions: conditions
        }))
    }

    const handleLabelChange = (e, conditionIndex) => {

        let conditions = [...meetingData.conditions]

        conditions[conditionIndex].label = e.target.value

        setMeetingData((meetingData) => ({
            ...meetingData,
            conditions: conditions
        }))
    }

    const SelectFieldOptions = (form_id, field_id) => {
        let field = meeting.form.fields.find((field) => field.id === field_id)

        return field.options.map((option) => {
            return {
                value: option.value,
                label: option.name,
            }
        })
    }

    const onUpdateMeeting = () => {
        Inertia.put(route('meetings.update', meeting.uuid), meetingData, {
            preserveScroll: true,
            onSuccess: () => {
                success('La reunión ha sido actualizada')
            },
            onError: (err) => {
                console.log(err)
                error('Ha ocurrido un error al actualizar la reunión')
            }
        })
    }

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title={`Reunión: ${meeting.title}`}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            <h4 className="box-title">Editar Reunión</h4>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="title">
                                            Título de la reunión
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            placeholder="Título de la reunión"
                                            value={data.title}
                                            disabled={true}
                                            onChange={(e) => {
                                                setData((data) => ({
                                                    ...data,
                                                    title: e.target.value
                                                }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="count">
                                            Cantidad de reuniones realizadas <strong>({meeting.total_meetings})</strong>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {can('Condiciones de Reuniones',auth.user.abilities) && (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box-content">
                                <h4 className="box-title">Condiciones</h4>

                                <div className="row">
                                    <div className="col-md-12">
                                        <button
                                            onClick={() => onNewCondition()}
                                            className="btn btn-primary btn-block">
                                            Agregar condición
                                            <i className="margin-left-5 fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>


                                <div className="row margin-top-15">
                                    {meetingData.conditions && meetingData.conditions.map((condition, index) => (
                                        <div className="col-md-12" key={`condition-${index}`}>
                                            <div className="box-content">

                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="label">
                                                                Etiqueta
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="label"
                                                                placeholder="Meta"
                                                                value={condition.label}
                                                                onChange={(e) => {
                                                                    handleLabelChange(e, index)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="target">
                                                                Objetivo
                                                            </label>

                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="target"
                                                                placeholder="Meta"
                                                                value={condition.target}
                                                                onChange={(e) => {
                                                                    handleTargetChange(e, index)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="label">
                                                                Campo
                                                            </label>
                                                            <Select
                                                                options={meeting.form.fields.map((field) => ({
                                                                    value: field.id,
                                                                    label: field.name
                                                                }))}
                                                                isSearchable
                                                                noOptionsMessage={() => 'No hay opciones'}
                                                                defaultValue={meeting.form.fields.find((field) => {
                                                                    return field.id === condition.field_id

                                                                })}
                                                                onChange={(e) => {
                                                                    handleFieldChange(e, index)
                                                                }}
                                                                placeholder={'Seleccione un campo de formulario'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="operand">
                                                                Operador
                                                            </label>
                                                            <Select
                                                                options={OPERANDS.filter(
                                                                    (operand) =>
                                                                        // Select the operands that contain the field type
                                                                        operand.form_type.includes(
                                                                            condition.field_type
                                                                        )
                                                                )}
                                                                placeholder="Operador"
                                                                isSearchable
                                                                noOptionsMessage={() =>
                                                                    'No hay opciones'
                                                                }
                                                                onChange={(option) => {
                                                                    handleOperandChange(
                                                                        option,
                                                                        index
                                                                    )
                                                                }}
                                                                defaultValue={
                                                                    condition.operand &&
                                                                    OPERANDS.find((operand) => {
                                                                        return (
                                                                            operand.value ===
                                                                            condition.operand
                                                                        )
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="value">
                                                                Valor
                                                            </label>

                                                            {condition.field_type === 'select' ||
                                                            condition.field_type ===
                                                            'select multiple' ? (
                                                                <Select
                                                                    options={SelectFieldOptions(
                                                                        condition.form_id,
                                                                        condition.field_id
                                                                    )}
                                                                    closeMenuOnSelect={false}
                                                                    placeholder="Valor"
                                                                    isSearchable
                                                                    isMulti
                                                                    noOptionsMessage={() => {
                                                                        return 'No hay opciones'
                                                                    }}
                                                                    onChange={(option) => {
                                                                        handleValueChange(option, index)
                                                                    }}
                                                                    defaultValue={
                                                                        condition.field_value &&
                                                                        SelectFieldOptions(
                                                                            condition.form_id,
                                                                            condition.field_id
                                                                        ).filter((option) => {
                                                                            return condition.field_value.includes(
                                                                                option.value
                                                                            )
                                                                        })
                                                                    }
                                                                />
                                                            ) : (
                                                                <input
                                                                    type={condition.field_type}
                                                                    className="form-control"
                                                                    id="goal_program"
                                                                    placeholder="Valor"
                                                                    onChange={(e) => {
                                                                        handleValueChange(e, index)
                                                                    }}
                                                                    defaultValue={
                                                                        condition.field_value &&
                                                                        condition.field_value
                                                                    }
                                                                />
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {meetingData.conditions && (
                                        <div className="col-md-12">
                                            <button
                                                onClick={() => onUpdateMeeting()}
                                                className="btn btn-info btn-block">
                                                Guardar condiciones
                                                <i className="margin-left-5 fa fa-save"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                )}


                <NewParticipant form={meeting.form} data={data} setData={setData} errors={errors}/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="box-content">
                            {editMode ? (
                                <div className="row">
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => resetEditMode()}
                                            disabled={processing}
                                            className="btn btn-danger btn-block">
                                            Cancelar
                                            <i className="margin-left-5 fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            onClick={() => updateMeeting()}
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
                            <div className="row">
                                {isExporting && (
                                    <div className="col-md-12">
                                        <div className="alert alert-success">
                                            <strong>Aviso:</strong> El Reporte se esta exportando, por favor espere
                                        </div>
                                    </div>
                                )}
                                <div className="col-md-12">
                                    <button
                                        disabled={exporting || isExporting}
                                        onClick={() => onMeetingReportExport()}
                                        className="btn btn-primary btn-block">
                                        Exportar a Excel
                                        <i className="margin-left-5 fa fa-file-excel-o"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        {meeting.headers.map((header, index) => (
                                            <th key={`header-${index}`}>{header}</th>
                                        ))}
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {meeting.participants.length > 0 ? (
                                        meeting.participants.map((participant, index) => (
                                            <tr key={`participant-${index}`}>
                                                {Object.values(participant.form_data).map((value, index) => (
                                                    <td key={`value-${index}`}>
                                                        {
                                                            // If the value is an array, print the values separated by comma
                                                            Array.isArray(value) ? value.join(', ') : value.length > 20 ? value.substring(0, 20) + '...' : value
                                                        }
                                                    </td>
                                                ))}
                                                <td className="text-center">
                                                    <button
                                                        onClick={() => toggleEditMode(participant)}
                                                        className="btn btn-warning btn-sm">
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={meeting.headers.length + 1} className="text-center">
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
