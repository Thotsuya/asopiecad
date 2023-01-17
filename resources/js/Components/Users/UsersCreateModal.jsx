import { useForm } from '@inertiajs/inertia-react'
import useToasts from '@/Hooks/Toasts'

export default function UsersCreateModal({ roles }) {
    const { data, setData, post, processing, errors, reset, transform } =
        useForm({
            name: '',
            email: '',
            password: '',
            role_id: roles[0] ? roles[0].id : null,
            password_confirmation: '',
        })

    const { success, error } = useToasts()

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('users.store'), {
            onSuccess: () => {
                success('Usuario creado correctamente')
                reset()
                document.getElementById('users-create-modal-close').click()
            },
            onError: () => {
                error('Ha ocurrido un error')
            },
        })
    }

    return (
        <div
            className="modal fade"
            id="users-create-modal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="users-create-modal-label"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            id="users-create-modal-close"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4
                            className="modal-title"
                            id="users-create-modal-label"
                        >
                            Nuevo Usuario
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div
                                className={`col-xs-12 ${
                                    errors.name ? 'has-error' : ''
                                }`}
                            >
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
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

                            <div
                                className={`col-xs-12 form-group margin-top-15 ${
                                    errors.email ? 'has-error' : ''
                                } `}
                            >
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => {
                                        setData('email', e.target.value)
                                    }}
                                />
                                {errors.email && (
                                    <span className="help-block">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`col-xs-12 form-group margin-top-15 ${
                                    errors.role_id ? 'has-error' : ''
                                } `}
                            >
                                <label htmlFor="role_id">Rol de Sistema</label>
                                <select
                                    className="form-control"
                                    id="role_id"
                                    name="role_id"
                                    value={data.role_id}
                                    onChange={(e) => {
                                        setData('role_id', e.target.value)
                                    }}
                                >
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div
                                className={`col-xs-12 form-group margin-top-15 ${
                                    errors.password ? 'has-error' : ''
                                } `}
                            >
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    id="password"
                                    name="password"
                                    onChange={(e) => {
                                        setData('password', e.target.value)
                                    }}
                                />
                                {errors.password && (
                                    <span className="help-block">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`col-xs-12 form-group margin-top-15 ${
                                    errors.password ? 'has-error' : ''
                                } `}
                            >
                                <label htmlFor="password_confirmation">
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmar contraseña"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    onChange={(e) => {
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default btn-sm waves-effect waves-light"
                            data-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm waves-effect waves-light"
                            disabled={processing}
                            onClick={handleSubmit}
                        >
                            {processing ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
