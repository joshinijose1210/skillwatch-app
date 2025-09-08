import { useCallback, useEffect, useState } from 'react';
import { ReviewCycle } from '@common/types';
import { reviewCycleTipsData } from './reviewCycleTipsData';
export const useReviewTips = (timelineData: ReviewCycle[]) => {
    const [activePhase, setActivePhase] = useState('');
    const handleGetActivePhase = useCallback(() => {
        const currentDate = new Date().toDateString();
        const timestamps = {
            'self-review': [timelineData[0]?.selfReviewStartDate, timelineData[0]?.selfReviewEndDate],
            'manager-review': [timelineData[0]?.managerReviewStartDate, timelineData[0]?.managerReviewEndDate],
            'check-in-with-manager': [timelineData[0]?.checkInWithManagerStartDate, timelineData[0]?.checkInWithManagerEndDate]
        };
        const phases = Object.entries(timestamps)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, [start, end]]) => {
                const startDate = new Date(start).toDateString();
                const endDate = new Date(end).toDateString();
                const hasStarted = currentDate >= startDate;
                const hasEnded = currentDate > endDate;
                return hasStarted && !hasEnded;
            })
            .map(([phase]) => phase);
        // prioritize self-review tipes when both self-review and manager-review are active
        if (phases.includes('self-review') && phases.includes('manager-review')) {
            setActivePhase('self-review');
        } else if (phases.includes('manager-review') && phases.includes('check-in-with-manager')) {
            setActivePhase('manager-review');
        } else if (phases.includes('check-in-with-manager')) {
            setActivePhase('check-in-with-manager');
        } else {
            setActivePhase(phases[0] || '');
        }
    }, [timelineData]);
    const handleToggle = (phase: string) => {
        setActivePhase(currentPhase => (currentPhase === phase ? '' : phase));
    };
    useEffect(() => {
        handleGetActivePhase();
    }, [handleGetActivePhase, timelineData]);
    return {
        data: { tipsData: reviewCycleTipsData, activePhase, setActivePhase, handleToggle }
    };
};
