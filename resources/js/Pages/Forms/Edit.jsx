import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";

export default function Edit({ form, auth }) {
    useEffect(() => {
        console.log(form);
    }, []);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Editar Formulario" />
        </AuthenticatedLayout>
    );
}
