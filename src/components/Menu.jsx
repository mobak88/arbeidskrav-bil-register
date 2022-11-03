import { Link } from 'react-router-dom';

import './menu.css';

const Menu = () => {
  return (
    <nav className='menu-section'>
      <h1> Hey and welcome to the main page</h1>
      <p>Here you can access your data</p>
      <div className='link-container'>
        <Link to='/person'>
          <button className='btn'>Users</button>
        </Link>
        <Link to='/createUser'>
          <button className='btn'>Create new user</button>
        </Link>
      </div>
    </nav>
  );
};
export default Menu;
