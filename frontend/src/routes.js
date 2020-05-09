import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


import Profile from './pages/Profile';


//ADMIN'S PAGES
import Logon from './pages/Admin/Logon';
import Register from './pages/Admin/Register';
import NewProject from './pages/Admin/NewProject';
import AdminProfile from './pages/Admin/Profile'
import AdminProfileProject from './pages/Admin/ProfileProject'

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} ></Route>
        <Route path="/register" component={Register} ></Route>
        <Route path="/profile" component={Profile} ></Route>
        <Route path="/projects/new" component={NewProject} ></Route>
        <Route path="/admin/profile" component={AdminProfile} ></Route>
        <Route path="/admin/project/:id" component={AdminProfileProject} ></Route>
      </Switch>
    </BrowserRouter>
  )
}