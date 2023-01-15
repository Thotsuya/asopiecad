import { useEffect, useRef, useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'
import useComments from '@/Hooks/Comments'

export default function AppointmentCreateModal({ project, beneficiary, auth }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        handleSubmit,
        commentsRef,
        toggleComments,
        setToggleComments,
        handleCommentAdd,
        handleCommentDelete,
        submitDisabled,
        wasSuccessful,
    } = useComments(auth)

    useEffect(() => {
        setData({
            ...data,
            project_id: project.id,
            benefitiary_id: beneficiary ? beneficiary.id : '',
            beneficiary_name: beneficiary ? beneficiary.name : '',
        })
    }, [beneficiary])

    return (
        <div
            className="modal fade"
            id="modal-register-appointment"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="modal-register-appointment-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="modal-register-appointment-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="modal-register-appointment-label"
                        >
                            Registrar visita{' '}
                            <i className="fa fa-calendar-check-o" />
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Nombre del beneficiario
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={data.beneficiary_name}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div
                                    className={`form-group ${
                                        errors.start_date ? 'has-error' : ''
                                    }`}
                                >
                                    <label htmlFor="start_date">
                                        Fecha y hora de la visita
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="start_date"
                                        name="start_date"
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                start_date: e.target.value,
                                            })
                                        }
                                    />
                                    {errors.start_date && (
                                        <span className="help-block">
                                            {errors.start_date}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div
                                    className={`form-group ${
                                        errors.title ? 'has-error' : ''
                                    }`}
                                >
                                    <label htmlFor="title">
                                        Breve descripción de la visita
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        placeholder={
                                            'Ej. Visita de seguimiento'
                                        }
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                    {errors.title && (
                                        <span className="help-block">
                                            {errors.title}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="comments">
                                        Comentarios{' '}
                                        <button
                                            type="button"
                                            className={`btn btn-xs btn-${
                                                toggleComments
                                                    ? 'danger'
                                                    : 'info'
                                            }`}
                                            onClick={() =>
                                                setToggleComments(
                                                    (prev) => !prev
                                                )
                                            }
                                        >
                                            {toggleComments ? (
                                                <i className="fa fa-times"></i>
                                            ) : (
                                                <i className="fa fa-plus"></i>
                                            )}
                                        </button>
                                    </label>
                                </div>
                                {data.comments.length === 0 && (
                                    <div className="alert alert-info">
                                        No hay comentarios registrados. Puedes
                                        agregar uno haciendo click en el botón
                                        +.
                                    </div>
                                )}
                                {toggleComments && (
                                    <div className="form-group">
                                        <label htmlFor="comment">
                                            Escríbe tu comentario
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="comment"
                                            name="comment"
                                            rows="3"
                                            ref={commentsRef}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    handleCommentAdd()
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm margin-top-10"
                                            onClick={handleCommentAdd}
                                        >
                                            Agregar comentario
                                        </button>
                                    </div>
                                )}
                                {data.comments.length > 0 && (
                                    <div className="list-group">
                                        {data.comments.map((comment, index) => (
                                            <div
                                                className="list-group-item"
                                                key={index}
                                            >
                                                <div className="row">
                                                    <div className="col-xs-12">
                                                        <p>{comment.comment}</p>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <small>
                                                            {new Date(
                                                                comment.date
                                                            ).toLocaleString()}{' '}
                                                            por{' '}
                                                            <b>
                                                                {comment.user}
                                                            </b>
                                                        </small>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-xs pull-right"
                                                            onClick={() =>
                                                                handleCommentDelete(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
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
                            disabled={processing}
                            onClick={handleSubmit}
                        >
                            {processing ? (
                                <>
                                    <i className="fa fa-spinner fa-spin"></i>{' '}
                                    Guardando...
                                </>
                            ) : (
                                'Registrar visita'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
