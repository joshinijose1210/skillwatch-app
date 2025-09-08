import { routeConstants } from '@constants';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DescriptionDiv, ShowMoreLink } from './Description.styled';
import { DescriptionProps } from './types';
import DOMPurify from 'dompurify';

export const Description: FC<DescriptionProps> = props => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [displayHtml, setDisplayHtml] = useState('');
    const navigateTo = useNavigate();

    const feedbacks = ['Positive', 'Improvement', 'Appreciation'];

    const handleOnClick = () => {
        navigateTo(props.isReceivedFeedback ? routeConstants.viewFeedbackFromDashboard : routeConstants.viewAppreciation, {
            state: {
                ...props,
                action: 'View',
                feedbackType: feedbacks[props.tagId - 1],
                actionFrom: props.isReceivedFeedback ? 'received' : 'appreciation'
            }
        });
    };

    useEffect(() => {
        const plainText = DOMPurify.sanitize(props.feedback, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
        const needsTruncation = plainText.length > 150;

        if (needsTruncation) {
            setIsTruncated(true);
            const truncatedText = plainText.slice(0, 150);
            const truncatedHtml = DOMPurify.sanitize(truncatedText); // Keep inline formatting safe
            setDisplayHtml(`${truncatedHtml}...`);
        } else {
            setDisplayHtml(DOMPurify.sanitize(props.feedback)); // Full original with tags
        }
    }, [props.feedback]);

    return (
        <DescriptionDiv>
            <span
                dangerouslySetInnerHTML={{
                    __html: displayHtml
                }}
            />
            {isTruncated && (
                <ShowMoreLink as="span" onClick={handleOnClick}>
                    {' '}
                    Show more
                </ShowMoreLink>
            )}
        </DescriptionDiv>
    );
};
