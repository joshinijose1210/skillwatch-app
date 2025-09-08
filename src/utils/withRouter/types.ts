import { Location, NavigateFunction, Params } from 'react-router-dom';

export interface RouteComponentProps {
    children?: React.ReactNode;
    router: {
        location: Location;
        navigate: NavigateFunction;
        params: Params;
    };
}
