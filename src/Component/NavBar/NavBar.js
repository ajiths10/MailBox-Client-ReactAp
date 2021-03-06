import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { authActions } from "../store/auth";
import "./NavBar.css";



const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    dispatch(authActions.setAuth(false));
    history.replace('/auth');
  };
  const isLogin = useSelector(state=>state.auth.isAuth)

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
