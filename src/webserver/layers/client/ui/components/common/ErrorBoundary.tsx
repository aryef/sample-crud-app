import { Component } from 'react';
import { isEmpty } from '../../../../common/utils';

class ErrorBoundary extends Component {
    state = {
        error: { message: null },
    };
    static getDerivedStateFromError(error: any) {
        return { error };
    }
    render() {
        const { error }: { error: { message: null } } = this.state;

        if (error && error.message && !isEmpty(error.message)) {
            return (
                <div>
                    <p>Seems like an error occurred!</p>
                    <p>{error.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
