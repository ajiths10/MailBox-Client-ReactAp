import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./Component/Footer/Footer";
import NavBar from "./Component/NavBar/NavBar";
import LoginPage from "./Component/Pages/LoginPage/LoginPage";
import MailBoxBody from "./Component/Pages/MailBox/Body/MailBoxBody";
import Loading from './Component/Loading/Loading';
import Welcome from "./Component/Pages/WelcomePage/Welcome";
import { useSelector } from "react-redux";


function App() {
  const isLogin = useSelector(state=>state.auth.isAuth);
  return (
    <Fragment>
      <NavBar />
      
      <Switch>
        <Route path="/auth" >
          { !isLogin &&<LoginPage />}
        </Route>
        <Route path="/welcome"> 
          { isLogin && <Welcome />}
          { !isLogin &&  <Redirect to='/auth'></Redirect>   }
        </Route>
        <Route path="/mailbox">
        { isLogin &&  <MailBoxBody /> }
        { !isLogin &&  <Redirect to='/auth'></Redirect>  }
        </Route>
        <Route path="/about">
          <Loading />
        </Route>
      </Switch>
      <Footer />
      
    </Fragment>
  );
}

export default App;
