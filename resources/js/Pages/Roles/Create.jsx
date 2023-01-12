import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/inertia-react'
import useSelect from '@/Hooks/Select'
import { useEffect } from 'react'
import useToasts from '@/Hooks/Toasts'

export default function Create({ permissions, auth }) {
    const { success, error } = useToasts()

    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            name: '',
            permissions: [],
        })

    useSelect({
        el: '.select2',
        placeholder: 'Seleccione los permisos del rol',
        selected: data.permissions,
        onChange: (permission) => {
            setData('permissions', [...data.permissions, parseInt(permission)])
        },
        onRemove: (permission) => {
            setData(
                'permissions',
                data.permissions.filter((p) => p !== parseInt(permission))
            )
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('roles.store'), {
            onSuccess: () => {
                success('Rol creado con éxito')
                reset()
            },
            onError: () => {
                error('Ha ocurrido un error')
            },
        })
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Crear Rol" />

            <div className="row row-inline-block small-spacing">
                <div className="col-xs-12">
                    <div className="box-content">
                        <h4 className="box-title">Crear Rol</h4>
                        <div className="row">
                            <div className="col-xs-12">
                                <div
                                    className={`form-group ${
                                        errors.name ? 'has-error' : ''
                                    }`}
                                >
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del Rol"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => {
                                            setData('name', e.target.value)
                                        }}
                                    />
                                    {errors.name && (
                                        <span className="help-block">
                                            {errors.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <label htmlFor="permissions">Permisos</label>
                                <div className="form-group">
                                    <select
                                        className="form-control select2"
                                        multiple
                                        id="permissions"
                                        name="permissions"
                                    >
                                        {permissions.map((permission) => (
                                            <option
                                                key={permission.id}
                                                value={permission.id}
                                            >
                                                {permission.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.permissions && (
                                        <span className="help-block">
                                            {errors.permissions}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-xs-12 margin-top-15">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm pull-right"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                >
                                    {processing ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
