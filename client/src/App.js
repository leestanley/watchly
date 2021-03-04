import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Title from './components/Title';
import Navbar from './components/Navbar';

import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FacebookRegisterPage from './pages/FacebookRegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/profile">
            <ProfilePage />
            <Navbar />
          </Route>
          <Route path="/list">
            <Title />
            <ListPage />
            <Navbar />
          </Route>
          <Route path="/search">
            <Title />
            <SearchPage />
            <Navbar />
          </Route>
          <Route path="/home">
            <Title />
            <HomePage />
            <Navbar />
          </Route>
          <Route path="/register" component={RegisterPage} />
          <Route path="/fbRegister" component={FacebookRegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
