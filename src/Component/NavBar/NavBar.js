import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";


const NavBar = () => {
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    history.replace('/auth');
  };
  const isLogin = false;

  return (
    <div className="mainDivv">
      <div className="subDivvH">
        <NavLink to="/welcome" className="nammeclass">
          Home
        </NavLink>
      </div>

      <div className="subDivvP">
        <NavLink to="/mailbox" className="nammeclass">
         Mail Box
        </NavLink>
      </div>

      <div className="subDivvA">
        <NavLink to="/about" className="nammeclass">
          About us
        </NavLink>
      </div>

    {false && <div className="container">
        <button className='toggleBtn'>Toggle</button>
    </div> }

      <div className="logoutDiv">
        <button onClick={logoutHandler} className="logoutBtn">
          {isLogin ? "LogOut" : "Login"}
        </button>
      </div>
      <hr className="hrelement"></hr>
    </div>
  );
};

export default NavBar;
