import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";

export default function Edit({ form, auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Editar Formulario" />
        </AuthenticatedLayout>
    );
}
