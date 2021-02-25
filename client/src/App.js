import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Title from './components/Title';
import Navbar from './components/Navbar';

import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Title />
        <Switch>
          <Route path="/list">
            <ListPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
