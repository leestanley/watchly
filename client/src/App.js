import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchPage from "./pages/SearchPage";
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
