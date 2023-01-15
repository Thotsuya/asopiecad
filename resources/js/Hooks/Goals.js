import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function useGoals(project) {
    const { data, setData, post, processing, reset, errors } = useForm({
        goal_description: '',
        goal_target: 0,
    })

    const { success, error } = useToasts()

    const handleGoalSubmit = (e) => {
        post(route('projects.goals.store', project.uuid), {
            preserveScroll: true,
            onSuccess: () => {
                reset('goal_description', 'goal_target')
                success('Meta registrada con éxito')
                document.getElementById('modal-register-goal-close').click()
            },
            onError: () => {
                error('No se pudo registrar la meta')
            },
        })
    }
    return { data, setData, processing, errors, handleGoalSubmit }
}
