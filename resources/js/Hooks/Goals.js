import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function useGoals(project) {
    const { data, setData, post, processing, reset, errors } = useForm({
        goal_description: '',
        goal_target: 0,
        group_every: 0,
        program_id: null,
        conditions: [],
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
            onError: (err) => {
                console.log(err)
                error('No se pudo registrar la meta')
            },
        })
    }

    const handleNewCondition = () => {
        setData('conditions', [
            ...data.conditions,
            {
                label: '',
                conditions: [
                    {
                        form_id: null,
                        form_slug: null,
                        field_id: null,
                        field_slug: null,
                        field_type: null,
                        field_value: null,
                        operand: null,
                    },
                ],
            },
        ])
    }

    const handleRemoveCondition = (index) => {
        console.log(index)
        let conditions = data.conditions.filter((condition, i) => i !== index)
        setData('conditions', conditions)
    }

    const handleNewConditionItem = (index) => {
        let conditions = data.conditions
        conditions[index].conditions.push({
            form_id: null,
            form_slug: null,
            field_id: null,
            field_slug: null,
            field_type: null,
            field_value: null,
            operand: null,
        })
        setData('conditions', conditions)
    }

    const handleDuplicate = (index) => {
        let conditions = data.conditions
        conditions.push(conditions[index])
        setData('conditions', conditions)
    }

    return {
        data,
        setData,
        processing,
        errors,
        handleGoalSubmit,
        handleNewCondition,
        handleRemoveCondition,
        handleNewConditionItem,
        handleDuplicate,
    }
}
