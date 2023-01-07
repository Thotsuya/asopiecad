import Sidebar from "@/Layouts/Sidebar";
import Navbar from "@/Layouts/Navbar";

export default function Authenticated({ auth, children }) {
    return (
        <>
            <Sidebar auth={auth} />
            <Navbar />

            <div id="wrapper">
                <div className="main-content">
                    <div>{children}</div>
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
