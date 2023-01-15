import useToasts from '@/Hooks/Toasts'
import { useForm } from '@inertiajs/inertia-react'
import { useRef, useState } from 'react'

export default function useComments(auth) {
    const { success, error } = useToasts()

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
        wasSuccessful,
    } = useForm({
        id: null,
        start_date: '',
        benefitiary_id: '',
        beneficiary_name: '',
        title: '',
        project_id: '',
        comments: [],
    })

    const [toggleComments, setToggleComments] = useState(false)
    const commentsRef = useRef(null)

    const handleCommentAdd = () => {
        setData({
            ...data,
            comments: [
                ...data.comments,
                {
                    comment: commentsRef.current.value,
                    date: new Date().toISOString(),
                    user: auth.user.name,
                    user_id: auth.user.id,
                },
            ],
        })
        commentsRef.current.value = ''
        commentsRef.current.focus()
    }

    const handleCommentDelete = (index) => {
        setData({
            ...data,
            comments: data.comments.filter((_, i) => i !== index),
        })
    }

    const submitDisabled = () => {
        return (
            !data.start_date ||
            !data.benefitiary_id ||
            !data.beneficiary_name ||
            processing
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('appointments.store'), {
            onSuccess: () => {
                success('La visita se ha registrado con éxito')
                document
                    .getElementById('modal-register-appointment-close')
                    .click()
                reset()
            },
            onError: () => {
                error('Ha ocurrido un error al registrar la visita')
            },
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        put(route('appointments.update', data.id), {
            onSuccess: () => {
                success('La visita se ha actualizado con éxito')
                document.getElementById('modal-edit-visit-close').click()
                reset()
            },
            onError: () => {
                error('Ha ocurrido un error al actualizar la visita')
            },
        })
    }

    return {
        data,
        setData,
        toggleComments,
        setToggleComments,
        commentsRef,
        handleCommentAdd,
        handleCommentDelete,
        submitDisabled,
        handleSubmit,
        handleUpdate,
        processing,
        errors,
        wasSuccessful,
    }
}
