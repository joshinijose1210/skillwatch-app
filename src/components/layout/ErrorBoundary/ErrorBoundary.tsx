import { RouteComponentProps } from '@utils/withRouter/types';
import withRouter from '@utils/withRouter';
import React from 'react';
import ErrorSomethingWentWrong from '@pages/ErrorSomethingWentWrong';

class ErrorBoundary extends React.PureComponent<RouteComponentProps, { error: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: false
        };
    }
    componentDidCatch() {
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) return <ErrorSomethingWentWrong />;
        else return <>{this.props.children}</>;
    }
}

export default withRouter(ErrorBoundary);
