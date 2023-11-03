import { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function ProjectTabs({ project }) {
    useEffect(() => {
        // To avoid the glitch where the selected tab is on n page and the
        // content is on n+1 page

        // Register the tab click event
        $('#myTabs a').on('click', function (e) {
            e.preventDefault()
            // Remove the query string from the url
            const url = window.location.href.split('?')[0]

            // Manual visit to the url with the tab query string
            Inertia.visit(url, {
                method: 'get',
                preserveState: true,
                preserveScroll: true,
            })
        })
    }, [])

    return (
        <ul className="nav nav-tabs" id="myTabs" role="tablist">
            <li role="presentation" className="active">
                <a
                    href="#general-info"
                    id="programs-tab"
                    role="tab"
                    data-toggle="tab"
                    aria-controls="home"
                    aria-expanded="true"
                >
                    Información General <i className="fa fa-info-circle" />
                </a>
            </li>
            <li role="presentation">
                <a
                    href="#programs"
                    id="programs-tab"
                    role="tab"
                    data-toggle="tab"
                    aria-controls="home"
                >
                    Programas <i className="fa fa-book" aria-hidden="true" />
                </a>
            </li>
            <li role="presentation">
                <a
                    href="#beneficiaries"
                    role="tab"
                    id="beneficiaries-tab"
                    data-toggle="tab"
                    aria-controls="profile"
                >
                    Participantes{' '}
                    <i className="fa fa-users" aria-hidden="true" />
                </a>
            </li>
            <li role="presentation">
                <a
                    href="#appointments"
                    role="tab"
                    id="appointments-tab"
                    data-toggle="tab"
                    aria-controls="profile"
                >
                    Visitas <i className="fa fa-calendar" aria-hidden="true" />
                </a>
            </li>
            <li role="presentation">
                <a
                    href="#goals"
                    role="tab"
                    id="goals-tab"
                    data-toggle="tab"
                    aria-controls="profile"
                >
                    Metas{' '}
                    <i className="fa fa-flag-checkered" aria-hidden="true" />
                </a>
            </li>

            <li role="presentation">
                <a
                    href="#meeting"
                    role="tab"
                    id="meetings-tab"
                    data-toggle="tab"
                    aria-controls="profile"
                >
                    Reuniones{' '}
                    <i className="fa fa-users" aria-hidden="true" />
                </a>
            </li>

            <li role="presentation">
                <a
                    href="#results"
                    role="tab"
                    id="results-tab"
                    data-toggle="tab"
                    aria-controls="results"
                >
                    Resultados{' '}
                    <i className="fa fa-bar-chart" aria-hidden="true" />

                </a>
            </li>
            <li role="presentation">
                <a
                    href="#inventory"
                    role="tab"
                    id="inventory-tab"
                    data-toggle="tab"
                    aria-controls="inventory"
                >
                    Inventario{' '}
                    {/*An icon related to inventory*/}
                    <i className="fa fa-clipboard" aria-hidden="true" />

                </a>
            </li>
        </ul>
    )
}
