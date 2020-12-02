import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      render={({ location }) => {
        if (isPrivate && !user)
          return <Redirect to={{ pathname: '/signin', state: location }} />;

        if (!isPrivate && !!user)
          return <Redirect to={{ pathname: '/home', state: location }} />;

        return <Component />;
      }}
      {...rest}
    />
  );
};

export default Route;
