import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/inertia-react'
import useUsers from '@/Hooks/Users'
import Pagination from '@/Components/Pagination'
import {useState, useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import Select from "react-select";
import useToasts from "@/Hooks/Toasts";

export default function Index({ auth, screenings, type }) {
    const { can } = useUsers()
    const {prompt, success, error} = useToasts()

    const [search, setSearch] = useState('')

    const projects = [
        {value: 'P-4211', label: 'P-4211'},
        {value: 'P-4353', label: 'P-4353'},
    ]

    useEffect(() => {
        _.debounce(() => {
            Inertia.reload({data: {search}})
        }, 500)()
    }, [search])

    const onScreeningCreate = (type) => {
        Inertia.get(route('screenings.create', {type}))
    }

    const onScreeningTypeChange = (e) => {
        Inertia.get(route('screenings.index', {type: e.value}))
    }

    const onScreeningDelete = (id) => {
        prompt('¿Estás seguro de eliminar este tamizaje?', 'Esta acción no se puede deshacer')
            .then((result) => {
                if (result.isConfirmed) {
                    Inertia.delete(route('screenings.destroy', {screening: id}),{
                        onSuccess: () => {
                            success('Tamizaje eliminado correctamente')
                        },
                        onError: () => {
                            error('No se pudo eliminar el tamizaje')
                        }
                    })
                }
            })
    }

    return (
        <>
            <AuthenticatedLayout auth={auth}>
                <Head title="Tamizajes" />

                <div className="prj-header margin-bottom-10">
                    {can('Registrar Tamizaje', auth.user.abilities) && (
                        <button type="button"
                                className="btn btn-submit-prj btn-sm waves-effect waves-light btn-info"
                                data-toggle="modal" data-target="#boostrapModal-1">
                            <i className="fa fa-plus" /> Nuevo Tamizaje
                        </button>
                    )}
                    <div className="result-count">{screenings.total} Tamizajes</div>
                </div>

                <div className="row">

                    <div className="col-md-10">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Tamizaje"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <Select
                            options={projects}
                            defaultValue={projects.find((option) => option.value === type)}
                            onChange={(e) => onScreeningTypeChange(e)}
                            placeholder={'Filtrar por tipo'}
                        />
                    </div>

                    <div className="col-md-12 margin-top-10">
                        <div className="box-content">
                            {screenings.total === 0 && (
                                <div className="alert alert-info">
                                    No hay tamizajes registrados
                                </div>
                            )}

                            {screenings.total > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th className="text-center">
                                                Nombre
                                            </th>
                                            <th className="text-center">
                                                Edad
                                            </th>
                                            <th className="text-center">
                                                Género
                                            </th>
                                            <th className="text-center">
                                                Fecha de Tamizaje
                                            </th>
                                            <th className="text-center">
                                                Tamizado Por
                                            </th>
                                            <th className="text-center">
                                                Proyecto
                                            </th>
                                            <th className="text-center">
                                                Acciones
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {screenings.data.map((screening) => (
                                            <tr key={screening.id}>
                                                <td className="text-center">
                                                    {screening.name}
                                                </td>
                                                <td className="text-center">
                                                    <span className="badge bg-info">
                                                        {screening.age}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    {screening.gender}
                                                </td>
                                                <td className="text-center">
                                                    {
                                                        screening.date_of_screening
                                                    }
                                                </td>
                                                <td className="text-center">
                                                    {screening.screened_by}
                                                </td>
                                                <td className="text-center">
                                                    {screening.type}
                                                </td>
                                                <td className="text-center">
                                                    <Link
                                                        href={route(
                                                            'screenings.edit',
                                                            {
                                                                screening: screening.uuid,
                                                                type: screening.type
                                                            }
                                                        )}
                                                        className="btn btn-xs btn-warning"
                                                    >
                                                        <i className="fa fa-edit" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-xs btn-danger"
                                                        onClick={() => onScreeningDelete(screening.uuid)}
                                                    >
                                                        <i className="fa fa-trash" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        current_page={screenings.current_page}
                                        last_page={screenings.last_page}
                                        total={screenings.total}
                                        per_page={screenings.per_page}
                                        next_page_url={screenings.next_page_url}
                                        prev_page_url={screenings.prev_page_url}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>

            <div class="modal fade" id="boostrapModal-1" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">
                                Nuevo Tamizaje <i className="fa fa-plus" />
                            </h4>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-xs-12">
                                    <button
                                        type="button"
                                        onClick={() => onScreeningCreate('P-4211')}
                                        data-dismiss="modal"
                                        className="btn btn-submit-prj btn-block waves-effect waves-light btn-info">
                                        <i className="fa fa-plus" /> Tamizaje P-4211
                                    </button>
                                </div>
                                <div className="col-xs-12 margin-top-15">
                                    <button
                                        type="button"
                                        onClick={() => onScreeningCreate('P-4353')}
                                        data-dismiss="modal"
                                        className="btn btn-submit-prj btn-block waves-effect waves-light btn-info">
                                        <i className="fa fa-plus" /> Tamizaje P-4353
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-default btn-sm waves-effect waves-light"
                                    data-dismiss="modal">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
