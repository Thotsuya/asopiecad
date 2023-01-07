import Swal from "sweetalert2";

export default function useToasts() {
    const success = (message) => {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        }).fire({
            icon: "success",
            title: message,
        });
    };

    const error = (message) => {
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        }).fire({
            icon: "error",
            title: message,
        });
    };

    const prompt = (title, message) => {
        return Swal.fire({
            title: title,
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, continuar!",
        });
    };

    return {
        success,
        error,
        prompt,
    };
}
