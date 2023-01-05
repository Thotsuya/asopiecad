export default function Sidebar() {
    return (
        <div className="main-menu">
            <header className="header">
                <a href="index.html" className="logo">
                    <i className="ico ti-rocket"></i>SpaceX
                </a>
                <button
                    type="button"
                    className="button-close fa fa-times js__menu_close"
                ></button>
            </header>
            <div className="content">
                <div className="navigation">
                    <h5 className="title">Navigation</h5>
                    <ul className="menu js__accordion">
                        <li className="current">
                            <a className="waves-effect" href="index.html">
                                <i className="menu-icon ti-dashboard"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a className="waves-effect" href="calendar.html">
                                <i className="menu-icon ti-calendar"></i>
                                <span>Calendar</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="waves-effect parent-item js__control"
                                href="#"
                            >
                                <i className="menu-icon ti-bar-chart"></i>
                                <span>Charts</span>
                                <span className="menu-arrow fa fa-angle-down"></span>
                            </a>
                            <ul className="sub-menu js__content">
                                <li>
                                    <a href="chart-3d.html">3D Charts</a>
                                </li>
                                <li>
                                    <a href="chart-chartist.html">
                                        Chartist Charts
                                    </a>
                                </li>
                                <li>
                                    <a href="chart-chartjs.html">
                                        Chartjs Chart
                                    </a>
                                </li>
                                <li>
                                    <a href="chart-dynamic.html">
                                        Dynamic Chart
                                    </a>
                                </li>
                                <li>
                                    <a href="chart-flot.html">Flot Chart</a>
                                </li>
                                <li>
                                    <a href="chart-knob.html">Knob Chart</a>
                                </li>
                                <li>
                                    <a href="chart-morris.html">Morris Chart</a>
                                </li>
                                <li>
                                    <a href="chart-sparkline.html">
                                        Sparkline Chart
                                    </a>
                                </li>
                                <li>
                                    <a href="chart-other.html">Other Chart</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="waves-effect" href="widgets.html">
                                <i className="menu-icon ti-layers-alt"></i>
                                <span>Widgets</span>
                                <span className="notice notice-yellow">6</span>
                            </a>
                        </li>
                    </ul>

                    <h5 className="title">User Interface</h5>

                    <ul className="menu js__accordion">
                        <li>
                            <a
                                className="waves-effect parent-item js__control"
                                href="#"
                            >
                                <i className="menu-icon ti-flag"></i>
                                <span>Icons</span>
                                <span className="menu-arrow fa fa-angle-down"></span>
                            </a>
                            <ul className="sub-menu js__content">
                                <li>
                                    <a href="icons-font-awesome-icons.html">
                                        Font Awesome
                                    </a>
                                </li>
                                <li>
                                    <a href="icons-fontello.html">Fontello</a>
                                </li>
                                <li>
                                    <a href="icons-material-icons.html">
                                        Material Design Icons
                                    </a>
                                </li>
                                <li>
                                    <a href="icons-material-design-iconic.html">
                                        Material Design Iconic Font
                                    </a>
                                </li>
                                <li>
                                    <a href="icons-themify-icons.html">
                                        Themify Icons
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                className="waves-effect parent-item js__control"
                                href="#"
                            >
                                <i className="menu-icon ti-desktop"></i>
                                <span>UI Kit</span>
                                <span className="menu-arrow fa fa-angle-down"></span>
                            </a>
                            <ul className="sub-menu js__content">
                                <li>
                                    <a href="ui-buttons.html">Buttons</a>
                                </li>
                                <li>
                                    <a href="ui-cards.html">Cards</a>
                                </li>
                                <li>
                                    <a href="ui-checkbox-radio.html">
                                        Checkboxs-Radios
                                    </a>
                                </li>
                                <li>
                                    <a href="ui-components.html">Components</a>
                                </li>
                                <li>
                                    <a href="ui-draggable-cards.html">
                                        Draggable Cards
                                    </a>
                                </li>
                                <li>
                                    <a href="ui-modals.html">Modals</a>
                                </li>
                                <li>
                                    <a href="ui-notification.html">
                                        Notification
                                    </a>
                                </li>
                                <li>
                                    <a href="ui-range-slider.html">
                                        Range Slider
                                    </a>
                                </li>
                                <li>
                                    <a href="ui-sweetalert.html">Sweet Alert</a>
                                </li>
                                <li>
                                    <a href="ui-treeview.html">Tree view</a>
                                </li>
                                <li>
                                    <a href="ui-typography.html">Typography</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                className="waves-effect parent-item js__control"
                                href="#"
                            >
                                <i className="menu-icon ti-layout"></i>
                                <span>Forms</span>
                                <span className="notice notice-blue">7</span>
                            </a>
                            <ul className="sub-menu js__content">
                                <li>
                                    <a href="form-elements.html">
                                        General Elements
                                    </a>
                                </li>
                                <li>
                                    <a href="form-advanced.html">
                                        Advanced Form
                                    </a>
                                </li>
                                <li>
                                    <a href="form-fileupload.html">
                                        Form Uploads
                                    </a>
                                </li>
                                <li>
                                    <a href="form-validation.html">
                                        Form Validation
                                    </a>
                                </li>
                                <li>
                                    <a href="form-wizard.html">Form Wizard</a>
                                </li>
                                <li>
                                    <a href="form-wysiwig.html">
                                        Wysiwig Editors
                                    </a>
                                </li>
                                <li>
                                    <a href="form-xeditable.html">X-editable</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                className="waves-effect parent-item js__control"
                                href="#"
                            >
                                <i className="menu-icon ti-layout-accordion-merged"></i>
                                <span>Tables</span>
                                <span className="menu-arrow fa fa-angle-down"></span>
                            </a>
                            <ul className="sub-menu js__content">
                                <li>
                                    <a href="tables-basic.html">Basic Tables</a>
                                </li>
                                <li>
                                    <a href="tables-datatable.html">
                                        Data Tables
                                    </a>
                                </li>
                                <li>
                                    <a href="tables-responsive.html">
                                        Responsive Tables
                                    </a>
                                </li>
                                <li>
                                    <a href="tables-editable.html">
                                        Editable Tables
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h5 className="title">Additions</h5>
                    <ul className="menu js__accordion">
                        <li>
                            <a className="waves-effect" href="profile.html">
                                <i className="menu-icon ti-user"></i>
                                <span>Profile</span>
                            </a>
                        </li>
                        <li>
                            <a className="waves-effect" href="inbox.html">
                                <i className="menu-icon ti-email"></i>
                                <span>Mail</span>
                                <span className="notice notice-danger">
                                    New
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="waves-effect parent-item js__control"
                                href="#"
                            >
                                <i className="menu-icon ti-layers"></i>
                                <span>Page</span>
                                <span className="menu-arrow fa fa-angle-down"></span>
                            </a>
                            <ul className="sub-menu js__content">
                                <li>
                                    <a href="page-starter.html">Starter Page</a>
                                </li>
                                <li>
                                    <a href="page-login.html">Login</a>
                                </li>
                                <li>
                                    <a href="page-register.html">Register</a>
                                </li>
                                <li>
                                    <a href="page-recoverpw.html">
                                        Recover Password
                                    </a>
                                </li>
                                <li>
                                    <a href="page-lock-screen.html">
                                        Lock Screen
                                    </a>
                                </li>
                                <li>
                                    <a href="page-confirm-mail.html">
                                        Confirm Mail
                                    </a>
                                </li>
                                <li>
                                    <a href="page-404.html">Error 404</a>
                                </li>
                                <li>
                                    <a href="page-500.html">Error 500</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                className="waves-effect parent-item js__control"
                                href="#"
                            >
                                <i className="menu-icon ti-blackboard"></i>
                                <span>Extra Pages</span>
                                <span className="menu-arrow fa fa-angle-down"></span>
                            </a>
                            <ul className="sub-menu js__content">
                                <li>
                                    <a href="extras-contact.html">
                                        Contact list
                                    </a>
                                </li>
                                <li>
                                    <a href="extras-email-template.html">
                                        Email template
                                    </a>
                                </li>
                                <li>
                                    <a href="extras-faq.html">FAQ</a>
                                </li>
                                <li>
                                    <a href="extras-gallery.html">Gallery</a>
                                </li>
                                <li>
                                    <a href="extras-invoice.html">Invoice</a>
                                </li>
                                <li>
                                    <a href="extras-maps.html">Maps</a>
                                </li>
                                <li>
                                    <a href="extras-pricing.html">Pricing</a>
                                </li>
                                <li>
                                    <a href="extras-projects.html">Projects</a>
                                </li>
                                <li>
                                    <a href="extras-taskboard.html">
                                        Taskboard
                                    </a>
                                </li>
                                <li>
                                    <a href="extras-timeline.html">Timeline</a>
                                </li>
                                <li>
                                    <a href="extras-tour.html">Tour</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
