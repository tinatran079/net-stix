import { NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useToken, getUser } from './auth'


function Nav() {
const [username, setUsername] = useState("");

 useEffect(() => {
      getUsername();
      }, []);
      const getUsername = async () => {
        const username = await getUser()
        setUsername(username);
        console.log(username)
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink className="nav-link" to="/">Main Page</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </li>
        <div>
          {username
          ?
           <li className="nav-item">
            <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
        :
         <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        }
        </div>
        </ul>
        <div>
        {username ? `Welcome, ${username}` : ""}
        </div>
        <div>

        <form className="d-flex" action="/games" method="get">
          <label htmlFor="header-search" className="center">
              <span className="visually-hidden">Search games</span>
          </label>
          <input
              className='center'
              type="text"
              id="header-search"
              placeholder="Search games"
              name="search"
          />
        </form>

      </div>
    </nav>
  )
}

export default Nav;
