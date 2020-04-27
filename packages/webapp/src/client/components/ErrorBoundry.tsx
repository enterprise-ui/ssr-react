import React, {ErrorInfo} from 'react';

interface IOwnProps {}

interface IState {
    error: Error;
    errorInfo: ErrorInfo;
}

class ErrorBoundary extends React.Component<IOwnProps, IState> {
    state = {error: null, errorInfo: null};

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    render() {
        const {error, errorInfo} = this.state;
        const {children} = this.props;

        if (errorInfo) {
            return (
                <React.Fragment>
                    <h2>Something went wrong.</h2>
                    <details style={{whiteSpace: 'pre-wrap'}}>
                        {error?.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </React.Fragment>
            );
        }

        return children;
    }
}

export {ErrorBoundary};
