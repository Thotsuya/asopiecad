import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function useProgress(goal = null) {
    const { data, setData, post, processing, reset, errors } = useForm({
        goal_description: '',
        goal_progress: 0,
    })

    const { success, error } = useToasts()

    const handleProgressSubmit = (e) => {
        post(route('projects.goals.progress.store', goal.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('progress_description', 'progress_value')
                success('Progreso registrado con éxito')
                document
                    .getElementById('modal-register-goal-progress-close')
                    .click()
            },
            onError: () => {
                error('No se pudo registrar el progreso')
            },
        })
    }
    return { data, setData, processing, errors, handleProgressSubmit }
}
