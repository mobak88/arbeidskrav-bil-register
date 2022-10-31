import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Layout = () => {
    return (
        <main className="App">
        <h1> Hey and welcome</h1>
        <Link to="login"><button>Log in</button></Link>
            <Outlet/>
        </main>
    )
}
export default Layout;

// Outlet should be used in parent route elements to render their child route elements. This allows 
// for nested UI to show up when child routes are rendered.