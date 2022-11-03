
import { Link  } from "react-router-dom";

import "./menu.css";

const Menu = () => {


    return (
       <nav className="menu-section">
        <h1 className="menu-title"> Hey and welcome to the main page</h1>
            <p className="menu-info">Here you can access your data</p>
            <div className="link-container">
                <Link   Link to ="/person"><button className='menu-btn'>Users</button></Link>
                <Link to ="/createUser"><button className='menu-btn'>Create new user</button></Link>
            </div>
       </nav>
    )
}
export default Menu;