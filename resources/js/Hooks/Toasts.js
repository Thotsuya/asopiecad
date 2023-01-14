import Swal from 'sweetalert2'

export default function useToasts() {
    const success = (message) => {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        }).fire({
            icon: 'success',
            title: message,
        })
    }

    const error = (message) => {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        }).fire({
            icon: 'error',
            title: message,
        })
    }

    const prompt = (title, message) => {
        return Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar!',
        })
    }

    const info = (message) => {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        }).fire({
            icon: 'info',
            title: message,
        })
    }

    const promptWithInput = (title, message, input, reason) => {
        return Swal.fire({
            title: title,
            text: message,
            input: input.input,
            inputPlaceholder: input.inputPlaceholder,
            inputLabel: input.inputLabel,
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return reason
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        })
    }

    return {
        success,
        error,
        info,
        prompt,
        promptWithInput,
    }
}
