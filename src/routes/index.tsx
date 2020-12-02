import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Landing from '../pages/Landing';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import AddPlace from '../pages/AddPlace';
import ViewPlace from '../pages/ViewPlace';
import AddDevice from '../pages/AddDevice';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/signup" component={Signup} />
    <Route path="/signin" component={Signin} />
    <Route path="/home" component={Home} isPrivate />
    <Route path="/places/:id/devices" component={AddDevice} isPrivate />
    <Route path="/places/:id" component={ViewPlace} isPrivate />
    <Route path="/places" component={AddPlace} isPrivate />
  </Switch>
);

export default Routes;
