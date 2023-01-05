import Sidebar from "@/Layouts/Sidebar";
import Navbar from "@/Layouts/Navbar";

export default function Authenticated({ auth, header, children }) {
    return (
        <>
            <Sidebar auth={auth} />
            <Navbar />

            <div
                id="notification-popup"
                className="notice-popup js__toggle"
                data-space="75"
            >
                <h2 className="popup-title">Your Notifications</h2>
                <div className="content">
                    <ul className="notice-list">
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/80x80"
                                        alt=""
                                    />
                                </span>
                                <span className="name">John Doe</span>
                                <span className="desc">
                                    Like your post: “Contact Form 7 Multi-Step”
                                </span>
                                <span className="time">10 min</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/80x80"
                                        alt=""
                                    />
                                </span>
                                <span className="name">Anna William</span>
                                <span className="desc">
                                    Like your post: “Facebook Messenger”
                                </span>
                                <span className="time">15 min</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar bg-warning">
                                    <i className="fa fa-warning"></i>
                                </span>
                                <span className="name">Update Status</span>
                                <span className="desc">
                                    Failed to get available update data. To
                                    ensure the please contact us.
                                </span>
                                <span className="time">30 min</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/128x128"
                                        alt=""
                                    />
                                </span>
                                <span className="name">Jennifer</span>
                                <span className="desc">
                                    Like your post: “Contact Form 7 Multi-Step”
                                </span>
                                <span className="time">45 min</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/80x80"
                                        alt=""
                                    />
                                </span>
                                <span className="name">Michael Zenaty</span>
                                <span className="desc">
                                    Like your post: “Contact Form 7 Multi-Step”
                                </span>
                                <span className="time">50 min</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/80x80"
                                        alt=""
                                    />
                                </span>
                                <span className="name">Simon</span>
                                <span className="desc">
                                    Like your post: “Facebook Messenger”
                                </span>
                                <span className="time">1 hour</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar bg-violet">
                                    <i className="fa fa-flag"></i>
                                </span>
                                <span className="name">
                                    Account Contact Change
                                </span>
                                <span className="desc">
                                    A contact detail associated with your
                                    account has been changed.
                                </span>
                                <span className="time">2 hours</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/80x80"
                                        alt=""
                                    />
                                </span>
                                <span className="name">Helen 987</span>
                                <span className="desc">
                                    Like your post: “Facebook Messenger”
                                </span>
                                <span className="time">Yesterday</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/128x128"
                                        alt=""
                                    />
                                </span>
                                <span className="name">Denise Jenny</span>
                                <span className="desc">
                                    Like your post: “Contact Form 7 Multi-Step”
                                </span>
                                <span className="time">Oct, 28</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="avatar">
                                    <img
                                        src="http://placehold.it/80x80"
                                        alt=""
                                    />
                                </span>
                                <span className="name">Thomas William</span>
                                <span className="desc">
                                    Like your post: “Facebook Messenger”
                                </span>
                                <span className="time">Oct, 27</span>
                            </a>
                        </li>
                    </ul>
                    <a href="#" className="notice-read-more">
                        See more messages <i className="fa fa-angle-down"></i>
                    </a>
                </div>
            </div>

            <div id="wrapper">
                <div className="main-content">
                    <div
                        style={{
                            height: "100vh",
                        }}
                    >
                        {children}
                    </div>
                    <footer className="footer">
                        <ul className="list-inline">
                            <li>2016 © NinjaAdmin.</li>
                            <li>
                                <a href="#">Privacy</a>
                            </li>
                            <li>
                                <a href="#">Terms</a>
                            </li>
                            <li>
                                <a href="#">Help</a>
                            </li>
                        </ul>
                    </footer>
                </div>
            </div>
        </>
    );
}
