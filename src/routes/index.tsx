import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../pages/Landing';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
  </Switch>
);

export default Routes;
