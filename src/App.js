import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AllUsers from "./AllUsers";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";
import Error404 from "./Error404";
import FilterUser from "./FilterUser";
import ExportCsv from "./ExportCsv";
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={AllUsers}/>
                <Route exact path="/update-user" component={UpdateUser}/>
                <Route exact path="/add-user" component={AddUser}/>
                <Route exact path="/filter-users" component={FilterUser}/>
                <Route exact path="/export" component={ExportCsv}/>
                <Route exact component={Error404}/>
            </Switch>
        </Router>
    );
}

export default App;
