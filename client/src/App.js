import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import LandingPage from './pages/LandingPage';
import SearchLandingPage from './pages/SearchLandingPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';
import FacebookRegisterPage from './pages/FacebookRegisterPage';
import ProfilePage from './pages/ProfilePage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/results" component={ResultsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/list" component={ListPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/searchlanding" component={SearchLandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/fbRegister" component={FacebookRegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
