import React from 'react'
import {Navbar} from '../Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Users } from '../Users/Users';
import { UserDetails } from '../UserDetails/UserDetails';
const App: React.FC = () : JSX.Element => {
  return (
    <>
      <Router basename="/test-yii/basic/web">
        <Navbar/>
        <Switch>
          <Route path="/users" component={Users}/>
          <Route path="/home" render={() => 
            <div className="card">
              <h1>Main page</h1>
            </div>}/>
          <Route path="/user/:id" render={({match}) => <UserDetails userId={match.params.id}/>} />
        </Switch>
      </Router>
    </>
  )
}

export { App };