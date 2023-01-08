import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";
import { useState, useEffect } from "react";
import ProjectTitleHeaderAndForm from "@/Pages/Projects/Partials/ProjectTitleHeaderAndForm";
import FormsAndMembers from "@/Pages/Projects/Partials/FormsAndMembers";
import Programs from "@/Pages/Projects/Partials/Programs";

export default function Edit({ auth, project, forms, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: project.id,
        form_id: project.form_id
            ? project.form_id
            : forms[0]
            ? forms[0].id
            : null,
        project_name: project.project_name,
        project_description: project.project_description,
        users: project.users,
        programs: project.programs,
    });

    const { success, error } = useToasts();

    const onMemberSelect = (member) => {
        setData("users", [...data.users, member]);
    };

    const onFormSelect = (form) => {
        setData("form_id", form);
    };

    const onMemberRemove = (member) => {
        const newUsers = data.users.filter((user) => user.id !== member.id);
        setData("users", newUsers);
    };

    const onProgramAdd = (program) => {
        setData("programs", [
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
        ]);
    };

    const toggleProgramEdit = (program_id) => {
        const newPrograms = data.programs.map((program) => {
            if (program.id === program_id) {
                program.editing = !program.editing;
            }
            return program;
        });
        setData("programs", newPrograms);
    };

    const onProgramEdit = (program_id, program_name) => {
        const newPrograms = data.programs.map((program) => {
            if (program.id === program_id) {
                program.program_name = program_name;
            }
            return program;
        });
        setData("programs", newPrograms);
    };

    const onProgramDelete = (program_id) => {
        const newPrograms = data.programs.filter(
            (program) => program.id !== program_id
        );
        setData("programs", newPrograms);
    };

    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;

        let updatedPrograms = [...data.programs];
        const [removed] = updatedPrograms.splice(droppedItem.source.index, 1);

        updatedPrograms.splice(droppedItem.destination.index, 0, removed);

        setData(
            "programs",
            updatedPrograms.map((program, index) => {
                program.order = index + 1;
                return program;
            })
        );
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={`Proyecto: ${project.project_name}`} />

            <ProjectTitleHeaderAndForm
                project={data}
                onProjectNameChange={(e) =>
                    setData("project_name", e.target.value)
                }
                onProjectDescriptionChange={(e) =>
                    setData("project_description", e.target.value)
                }
            />

            <div className="row">
                <div className="col-xs-12 col-lg-4">
                    <FormsAndMembers
                        users={
                            users.filter((user) => {
                                return !data.users
                                    .map((user) => user.id)
                                    .includes(user.id);
                            }) ?? []
                        }
                        forms={forms}
                        project={data}
                        onMemberSelect={onMemberSelect}
                        onFormSelect={onFormSelect}
                        onMemberRemove={onMemberRemove}
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
        </AuthenticatedLayout>
    );
}
