import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'
import { useState, useEffect } from 'react'
import ProjectTitleHeaderAndForm from '@/Pages/Projects/Partials/ProjectTitleHeaderAndForm'
import FormsAndMembers from '@/Pages/Projects/Partials/FormsAndMembers'
import Programs from '@/Pages/Projects/Partials/Programs'

export default function Edit({ auth, project, forms, users, roles }) {
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
            programs: project.programs,
            global_goal: project.global_goal ?? 1,
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
        setData('programs', [
            ...data.programs,
            {
                id: data.programs.length > 0 ? data.programs.length + 1 : 1,
                program_name: program,
                order:
                    data.programs.length > 0
                        ? data.programs[data.programs.length - 1].order + 1
                        : 1,
                editing: false,
            },
        ])
    }

    const onGlobalGoalChange = (e) => {
        setData('global_goal', e.target.value)
    }

    const toggleProgramEdit = (program_id) => {
        const newPrograms = data.programs.map((program) => {
            if (program.id === program_id) {
                program.editing = !program.editing
            }
            return program
        })
        setData('programs', newPrograms)
    }

    const onProgramEdit = (program_id, program_name) => {
        const newPrograms = data.programs.map((program) => {
            if (program.id === program_id) {
                program.program_name = program_name
            }
            return program
        })
        setData('programs', newPrograms)
    }

    const onProgramDelete = (program_id) => {
        const newPrograms = data.programs.filter(
            (program) => program.id !== program_id
        )
        setData('programs', newPrograms)
    }

    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return

        let updatedPrograms = [...data.programs]
        const [removed] = updatedPrograms.splice(droppedItem.source.index, 1)

        updatedPrograms.splice(droppedItem.destination.index, 0, removed)

        setData(
            'programs',
            updatedPrograms.map((program, index) => {
                program.order = index + 1
                return program
            })
        )
    }

    const handleFormSubmit = (e) => {
        put(route('projects.update', project.uuid), {
            preserveScroll: true,
            onSuccess: () => {
                success('Proyecto actualizado correctamente')
            },
            onError: () => {
                error('Ha ocurrido un error al actualizar el proyecto')
            },
        })
    }

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
                    />
                </div>

                <div className="col-lg-8 col-xs-12">
                    <Programs
                        programs={data.programs}
                        onProgramAdd={onProgramAdd}
                        toggleProgramEdit={toggleProgramEdit}
                        onProgramEdit={onProgramEdit}
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
