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
                    Programas
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
                    Beneficiarios
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
                    Metas
                </a>
            </li>
        </ul>
    )
}
