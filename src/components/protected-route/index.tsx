import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    redirectPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {

    if (!props.isAuthenticated) {
        return <Redirect to={props.redirectPath} />;
    }
    else {
        return <Route {...props} />;
    }
};

export default ProtectedRoute;
