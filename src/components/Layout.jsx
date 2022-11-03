import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import "./layout.css";

const Layout = () => {
  
    return (
        <main className="App">
            <div className="layout-container">
                <h1 className="layout-title"> Hey and welcome</h1>
                <p className="layout-info">Login to your user here</p>
                <Link to="login"><button className="layout-btn">Log in</button></Link>
             </div>
            <Outlet/>
        </main>
    )
}
export default Layout;

// Outlet should be used in parent route elements to render their child route elements. This allows 
// for nested UI to show up when child routes are rendered.