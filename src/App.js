import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AllUsers from "./AllUsers";
import UpdateUser from "./UpdateUser";
function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={AllUsers}/>
          <Route exact path="/update-user" component={UpdateUser}/>
        </Switch>
      </Router>
  );
}

export default App;
