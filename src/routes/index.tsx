import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Landing from '../pages/Landing';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/signup" component={Signup} />
    <Route path="/signin" component={Signin} />
    <Route path="/home" component={Home} isPrivate />
  </Switch>
);

export default Routes;
