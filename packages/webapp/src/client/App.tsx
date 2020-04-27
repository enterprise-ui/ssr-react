import React from 'react';
import {renderRoutes} from 'react-router-config';
import {ErrorBoundary} from './components/ErrorBoundry';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {IRoute} from './Models';

interface IOwnProps {
    route: IRoute;
}

const App: React.FunctionComponent<IOwnProps> = ({route}) => (
    <div>
        <Header />
        <div className="container">
            <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
        </div>
        <Footer />
    </div>
);

export {App};
