import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import useToasts from '@/Hooks/Toasts'
import ProjectTitleHeaderAndForm from '@/Pages/Projects/Partials/ProjectTitleHeaderAndForm'
import FormsAndMembers from '@/Pages/Projects/Partials/FormsAndMembers'
import Programs from '@/Pages/Projects/Partials/Programs'
import { useEffect, useState } from 'react'

export default function Edit({ auth, project, forms, users, roles }) {
    const [programs, setPrograms] = useState(project.programs ?? [])

    const { data, setData, put, processing, errors, reset, transform } =
        useForm({
            id: project.id,
            uuid: project.uuid,
            forms: project.forms ? project.forms.map((form) => form.id) : [],
            project_name: project.project_name,
            project_description:
                project.project_description.length > 0
                    ? project.project_description
                    : 'Descripción del proyecto',
            users: project.users
                ? project.users.map((user) => {
                      return {
                          id: user.id,
                          name: user.name,
                          role_id: user.pivot.role_id
                              ? user.pivot.role_id
                              : roles[0]
                              ? roles[0].id
                              : null,
                      }
                  })
                : [],
            global_goal: project.global_goal ?? 1,
            project_duration: project.project_duration ?? 1,
            project_start_date: project.project_start_date ?? '',
            project_featured_image: project.project_featured_image ?? '',
        })

    const { success, error } = useToasts()

    const onMemberSelect = (member) => {
        setData('users', [...data.users, member])
    }

    const onFormSelect = (form) => {
        setData('forms', [...data.forms, parseInt(form)])
    }

    const onFormRemove = (form) => {
        setData(
            'forms',
            data.forms.filter((f) => f !== parseInt(form))
        )
    }

    const onMemberRemove = (member) => {
        const newUsers = data.users.filter((user) => user.id !== member.id)
        setData('users', newUsers)
    }

    const onProgramAdd = (program) => {
        Inertia.post(route('projects.programs.store', project.uuid), program, {
            onSuccess: () => {
                success('Programa agregado correctamente')
            },
            onError: (err) => {
                error('No se pudo agregar el programa')
            },
        })
    }

    const onGlobalGoalChange = (e) => {
        setData('global_goal', e.target.value)
    }

    const onDurationChange = (e) => {
        setData('project_duration', e.target.value)
    }

    const toggleProgramEdit = (program_id) => {
        const newPrograms = programs.map((program) => {
            if (program.id === program_id) {
                program.edit_mode = !program.edit_mode
            }

            return program
        })

        setPrograms(newPrograms)
    }

    const onProgramDelete = (program_id) => {
        const newPrograms = data.programs.filter(
            (program) => program.id !== program_id
        )
        setData('programs', newPrograms)
    }

    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return

        let updatedPrograms = [...project.programs]
        const [removed] = updatedPrograms.splice(droppedItem.source.index, 1)

        updatedPrograms.splice(droppedItem.destination.index, 0, removed)

        setPrograms(
            updatedPrograms.map((program, index) => {
                program.order = index + 1
                return program
            })
        )

        Inertia.patch(
            route('projects.programs.order', project.uuid),
            {
                programs: updatedPrograms,
            },
            {
                onSuccess: () => {
                    success('Programas ordenados correctamente')
                },
                onError: (err) => {
                    error('No se pudo ordenar los programas')
                },
            }
        )
    }

    const onProjectStartDateChange = (e) => {
        setData('project_start_date', e.target.value)
    }

    const onProjectFeaturedImageChange = (e) => {
        setData((data) => ({
            ...data,
            project_featured_image: e.target.files[0],
        }))
    }

    const handleFormSubmit = (e) => {

        Inertia.post(route('projects.update', project.uuid), {
            ...data,
            _method: 'PUT',
        }, {
            preserveScroll: true,
            onSuccess: () => {
                success('Proyecto actualizado correctamente')
            },
            onError: (err) => {
                error('Ha ocurrido un error al actualizar el proyecto')

                Object.keys(err).forEach((key) => {
                    console.log(key)
                    error(err[key])
                })
            }
        })
    }

    useEffect(() => {
        setPrograms(project.programs)
    }, [project])

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={`Proyecto: ${project.project_name}`} />

            <ProjectTitleHeaderAndForm
                project={data}
                onProjectNameChange={(e) =>
                    setData('project_name', e.target.value)
                }
                onProjectDescriptionChange={(e) =>
                    setData('project_description', e.target.value)
                }
            />

            <div className="row">
                <div className="col-xs-12 col-lg-4">
                    <FormsAndMembers
                        users={
                            users.filter((user) => {
                                return !data.users
                                    .map((user) => user.id)
                                    .includes(user.id)
                            }) ?? []
                        }
                        forms={forms}
                        project={data}
                        roles={roles}
                        onMemberSelect={onMemberSelect}
                        onFormSelect={onFormSelect}
                        onMemberRemove={onMemberRemove}
                        onFormRemove={onFormRemove}
                        onGlobalGoalChange={onGlobalGoalChange}
                        onProjectDurationChange={onDurationChange}
                        onProjectStartDateChange={onProjectStartDateChange}
                        onProjectFeaturedImageChange={onProjectFeaturedImageChange}
                    />
                </div>

                <div className="col-lg-8 col-xs-12">
                    <Programs
                        programs={programs}
                        forms={forms}
                        onProgramAdd={onProgramAdd}
                        toggleProgramEdit={toggleProgramEdit}
                        onProgramDelete={onProgramDelete}
                        handleDrop={handleDrop}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={handleFormSubmit}
                        disabled={processing}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
