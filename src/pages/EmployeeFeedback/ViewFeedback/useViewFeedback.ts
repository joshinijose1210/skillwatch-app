import { useLocation } from 'react-router-dom';
import { FeedbackDataTypes } from './types';

export const useViewFeedback = () => {
    const state = useLocation().state as FeedbackDataTypes;
    return {
        state
    };
};
