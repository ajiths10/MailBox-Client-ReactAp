import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./Component/Footer/Footer";
import NavBar from "./Component/NavBar/NavBar";
import LoginPage from "./Component/Pages/LoginPage/LoginPage";
import Welcome from "./Component/Pages/WelcomePage/Welcome";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/auth">
          <LoginPage />
        </Route>

        <Route path="/welcome">
          <Welcome />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
