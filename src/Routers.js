import React, { Component } from 'react';
import { Router, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './Views/Login/Login';
import SignUp from './Views/Login/SignUp';
import Dashboard from './Views/UserDashBoard/Dashboard';
import Profile from './Views/UserDashBoard/Profile';
import BusinessDetail from './Views/Business/BusinessDetail';
import BusinessDetailAdd from './Views/Business/BusinessDetailAdd';
import AddOffers from './Views/Offers/AddOffers';
import ManageOffers from './Views/Offers/ManageOffers';
import RedeemedOffers from './Views/Offers/RedeemedOffers';
import { history } from './Helpers';

class Routers extends Component {
  render() {
    return (
      <Router history={history}>
      {/* <Router > */}
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/Login' component={Login} />
          <Route path='/SignUp' component={SignUp} /> 
          <Route path='/Dashboard' component={Dashboard} />
          <Route path='/Profile' component={Profile} />
          <Route path='/BusinessDetail' component={BusinessDetail} />
          <Route path='/BusinessDetailAdd' component={BusinessDetailAdd} />
          <Route path='/AddOffers' component={AddOffers} />
          <Route path='/ManageOffers' component={ManageOffers} />
          <Route path='/RedeemedOffers' component={RedeemedOffers} />
        </Switch>
      </Router>
    );
  }
}

export default Routers;