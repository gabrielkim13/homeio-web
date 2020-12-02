import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/signup" component={Signup} />
    <Route path="/signin" component={Signin} />
  </Switch>
);

export default Routes;
