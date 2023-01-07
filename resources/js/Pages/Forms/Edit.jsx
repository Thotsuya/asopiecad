import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import useToasts from "@/Hooks/Toasts";

export default function Edit({ form, auth }) {
    const [option, setOption] = useState("");
    const [tab, setTab] = useState("");

    const { success, error } = useToasts();

    const { data, setData, put, processing, errors, reset } = useForm({
        id: form.id,
        form_name: form.form_name,
        tabs: form.tabs,
        fields: form.fields,
    });

    const [field, setField] = useState({
        name: "",
        type: "text",
        required: false,
        size: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
        tab_id: data.tabs.length > 0 ? data.tabs[0].id : "1",
        options: [],
    });

    const handleFormSubmit = (e) => {
        put(route("forms.update", data.id), {
            onSuccess: () => {
                success("Formulario actualizado correctamente");
            },
            onError: () => {
                error("Error al actualizar el formulario");
            },
        });
    };

    const addTabToForm = () => {
        setData({
            ...data,
            tabs: [
                ...data.tabs,
                {
                    id:
                        data.tabs.length > 0
                            ? parseInt(data.tabs[data.tabs.length - 1].id) + 1
                            : 1,
                    name: tab,
                    slug: tab.toLowerCase().replace(/ /g, "-"),
                    editMode: false,
                    order:
                        data.tabs.length > 0
                            ? data.tabs[data.tabs.length - 1].order + 1
                            : 1,
                },
            ],
        });
        setTab("");
    };

    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Editar Formulario" />
        </AuthenticatedLayout>
    );
}
