import { Fragment, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./Component/Footer/Footer";
import NavBar from "./Component/NavBar/NavBar";
import LoginPage from "./Component/Pages/LoginPage/LoginPage";
import MailBoxBody from "./Component/Pages/MailBox/Body/MailBoxBody";
import Loading from './Component/Loading/Loading';
import Welcome from "./Component/Pages/WelcomePage/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Component/store/auth";


function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state=>state.auth.isAuth);
  useEffect(()=>{ dispatch(authActions.checker()) },[])
  
  return (
    <Fragment>
      <NavBar />
      <Switch>
        { isLogin && <Route path="/welcome"> 
          <Welcome />
        </Route>}

        { isLogin && <Route path="/mailbox">
         <MailBoxBody /> 
        </Route>}

        <Route path="/about">
          <Loading />
        </Route>
         { !isLogin &&<Route path="/auth" >
         <LoginPage />
        </Route>}

        <Route path='*' exact>
          {isLogin && <Redirect to='/mailbox'></Redirect>}
          { !isLogin && <Redirect to='/auth'></Redirect>}
        </Route>

      </Switch>
      <Footer />
      
    </Fragment>
  );
}

export default App;
