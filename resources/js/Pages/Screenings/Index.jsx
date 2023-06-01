import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/inertia-react'
import useUsers from '@/Hooks/Users'
import Pagination from '@/Components/Pagination'
import {useState, useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";

export default function Index({ auth, screenings }) {
    const { can } = useUsers()

    const [search, setSearch] = useState('')


    useEffect(() => {
        _.debounce(() => {
            Inertia.reload({data: {search}})
        }, 500)()
    }, [search])

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Tamizajes" />

            <div className="prj-header margin-bottom-10">
                {can('Registrar Tamizaje', auth.user.abilities) && (
                    <Link
                        href={route('screenings.create')}
                        className="btn btn-submit-prj btn-sm waves-effect waves-light btn-info"
                    >
                        Nuevo Tamizaje <i className="fa fa-plus" />
                    </Link>
                )}
                <div className="result-count">{screenings.total} Tamizajes</div>
            </div>

            <div className="row">

                <div className="col-md-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar Tamizaje"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
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
                                                Comunicación
                                            </th>
                                            <th className="text-center">
                                                Movimientos Amplios
                                            </th>
                                            <th className="text-center">
                                                Movimientos Fines
                                            </th>
                                            <th className="text-center">
                                                Resolución de Problemas
                                            </th>
                                            <th className="text-center">
                                                Socio Individual
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
                                                    {screening.communication}
                                                </td>
                                                <td className="text-center">
                                                    {screening.wide_movements}
                                                </td>
                                                <td className="text-center">
                                                    {screening.fine_movements}
                                                </td>
                                                <td className="text-center">
                                                    {screening.problem_solving}
                                                </td>
                                                <td className="text-center">
                                                    {
                                                        screening.social_individual
                                                    }
                                                </td>
                                                <td className="text-center">
                                                    <Link
                                                        href={route(
                                                            'screenings.edit',
                                                            screening.uuid
                                                        )}
                                                        className="btn btn-xs btn-warning"
                                                    >
                                                        <i className="fa fa-edit" />
                                                    </Link>
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
    )
}
