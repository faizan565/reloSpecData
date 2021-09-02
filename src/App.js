import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AllUsers from "./AllUsers";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={AllUsers}/>
                <Route exact path="/update-user" component={UpdateUser}/>
                <Route exact path="/add-user" component={AddUser}/>
            </Switch>
        </Router>
    );
}

export default App;
