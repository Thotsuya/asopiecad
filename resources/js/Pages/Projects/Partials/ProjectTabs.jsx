export default function ProjectTabs({ project }) {
    return (
        <ul className="nav nav-tabs" id="myTabs" role="tablist">
            <li role="presentation" className="active">
                <a
                    href="#programs"
                    id="programs-tab"
                    role="tab"
                    data-toggle="tab"
                    aria-controls="home"
                    aria-expanded="true"
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
                    Beneficiarios{' '}
                    <i className="fa fa-users" aria-hidden="true" />
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
        </ul>
    )
}
