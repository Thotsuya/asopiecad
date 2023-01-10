import { Link } from "@inertiajs/inertia-react";

export default function Pagination({
    prev_page_url,
    next_page_url,
    current_page,
    last_page,
    per_page,
    total,
}) {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={prev_page_url ? "" : "disabled"}>
                    <Link
                        className="page-link"
                        href={prev_page_url}
                        preserveScroll
                        preserveState
                    >
                        Anterior
                    </Link>
                </li>
                <li className="page-item">
                    <span className="page-link">
                        Página {current_page} de {last_page}
                    </span>
                </li>
                <li className={next_page_url ? "" : "disabled"}>
                    <Link
                        className="page-link"
                        href={next_page_url}
                        preserveScroll
                        preserveState
                    >
                        Siguiente
                    </Link>
                </li>
            </ul>

            <span className="pull-right">
                Mostrando{" "}
                {current_page * per_page > total
                    ? total
                    : current_page * per_page}{" "}
                de {total} registros
            </span>
        </nav>
    );
}
