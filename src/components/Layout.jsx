import { Outlet } from "react-router";

const Layout = () => {
    return (
        <main className="App">
            <Outlet/>
        </main>
    )
}
export default Layout;

// Outlet should be used in parent route elements to render their child route elements. This allows 
// for nested UI to show up when child routes are rendered.