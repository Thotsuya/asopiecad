export default function ProjectTabs({ project }) {
    return (
        <ul className="nav nav-tabs" id="myTabs" role="tablist">
            <li role="presentation" className="active">
                <a
                    href="#home"
                    id="home-tab"
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
                    href="#profile"
                    role="tab"
                    id="profile-tab"
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
                    id="profile-tab"
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
