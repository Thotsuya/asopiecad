import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";
import { useState, useEffect } from "react";
import ProjectTitleHeaderAndForm from "@/Pages/Projects/Partials/ProjectTitleHeaderAndForm";
import FormsAndMembers from "@/Pages/Projects/Partials/FormsAndMembers";

export default function Show({ auth, project, forms, users }) {
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
        </AuthenticatedLayout>
    );
}
