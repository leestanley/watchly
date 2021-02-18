import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchPage from "./pages/SearchPage";



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <h1>This is the homage page - replace this with a component</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
