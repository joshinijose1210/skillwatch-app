import { Button } from '@medly-components/core';
import { ArrowBackIosIcon } from '@medly-components/icons';
import { useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
    const navigate = useNavigate();
    return (
        <Button variant="flat" hideUnderline={true} onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
            Go Back
        </Button>
    );
};
