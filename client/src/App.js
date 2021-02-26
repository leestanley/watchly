import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Title from './components/Title';
import Navbar from './components/Navbar';

import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
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
          <Route path="/login" component={LoginPage} />
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
