import { useEffect, FC, useState, useRef, useCallback } from 'react';
import { Tooltip } from 'react-tooltip';
import { TooltipProps, OptionsType } from './types';
import * as Styled from './TooltipDropdown.styled';

export const TooltipDropdown: FC<TooltipProps> = ({ dataIds, values }) => {
    const [displayedText, setDisplayedText] = useState<string>('');
    const [tooltipData, setTooltipData] = useState<Record<string, OptionsType[]>>({});

    const valueObserverRef = useRef<MutationObserver | null>(null);
    const updateTooltipsFromSession = useCallback(() => {
        const storedTooltips = JSON.parse(sessionStorage.getItem('tooltips')!);
        if (storedTooltips) {
            const updatedTooltips: Record<string, OptionsType[]> = {};

            for (const tooltip in storedTooltips) {
                if (storedTooltips[tooltip]?.length) {
                    updatedTooltips[tooltip] = storedTooltips[tooltip];
                    const targetElement = document.getElementById(tooltip);
                    if (targetElement) {
                        targetElement.setAttribute('data-tooltip-id', tooltip);
                    }
                }
            }

            setTooltipData(updatedTooltips);
            sessionStorage.setItem('tooltips', JSON.stringify(updatedTooltips));
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(updateTooltipsFromSession, 500);
        return () => clearInterval(interval);
    }, [updateTooltipsFromSession]);

    const setOptionsTexts = useCallback(() => {
        if (values.length) {
            const targetId = dataIds[1];
            const element = document.getElementById(targetId);
            element?.setAttribute('data-tooltip-id', targetId);
        }
    }, [dataIds, values]);

    const observeValueAttribute = useCallback(
        (element: HTMLElement) => {
            const handleValueChanges = (mutationsList: MutationRecord[]) => {
                mutationsList.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                        const updatedValue = (mutation.target as HTMLElement).getAttribute('value');
                        if (!updatedValue) {
                            setDisplayedText('');
                        } else {
                            const isEllipsis = element.scrollWidth > element.clientWidth;
                            if (isEllipsis) {
                                setDisplayedText(updatedValue);
                            } else {
                                setDisplayedText('');
                            }
                            setOptionsTexts();
                        }
                    }
                });
            };

            valueObserverRef.current = new MutationObserver(handleValueChanges);

            valueObserverRef.current.observe(element, {
                attributes: true,
                attributeFilter: ['value']
            });
        },
        [setOptionsTexts]
    );

    const updateInputTooltip = useCallback(() => {
        if (values.length) {
            const inputValue = values.map(val => val.label).join(', ');
            const targetId = dataIds[0];
            const element = document.getElementById(targetId);
            if (element) {
                const isEllipsis = element.scrollWidth > element.clientWidth;
                if (isEllipsis) {
                    setDisplayedText(inputValue);
                } else {
                    setDisplayedText('');
                }
            }
        }
    }, [dataIds, values]);

    useEffect(() => {
        if (dataIds?.length) {
            const updatedTooltips = { ...tooltipData };
            let tooltipsChanged = false;

            dataIds.forEach(dataId => {
                const element = document.getElementById(dataId);
                if (element) {
                    element.setAttribute('data-tooltip-id', dataId);

                    if (dataId === dataIds[0]) {
                        observeValueAttribute(element);
                    }
                    if (!tooltipData[dataId] || JSON.stringify(tooltipData[dataId]) !== JSON.stringify(values)) {
                        updatedTooltips[dataId] = values;
                        tooltipsChanged = true;
                    }
                }
            });

            if (tooltipsChanged) {
                updateInputTooltip();
                sessionStorage.setItem('tooltips', JSON.stringify(updatedTooltips));
                setTooltipData(updatedTooltips);
            }
        }

        return () => {
            valueObserverRef.current?.disconnect();
        };
    }, [dataIds, values, tooltipData, observeValueAttribute, updateInputTooltip]);

    return (
        <>
            {dataIds.length > 0 && displayedText && (
                <Tooltip id={dataIds[0]} place="bottom-end">
                    <Styled.ContentWrapper>
                        <span>{displayedText}</span>
                    </Styled.ContentWrapper>
                </Tooltip>
            )}
            {dataIds.length === 2 && tooltipData.length && values.length > 0 && (
                <Tooltip key={dataIds[1]} id={dataIds[1]} place="bottom-end">
                    <Styled.ContentWrapper>
                        {Object.entries(tooltipData).map(
                            ([id, options]) =>
                                options.length > 0 &&
                                id === dataIds[1] &&
                                options.map((option, index) => <span key={index}>{option.label}</span>)
                        )}
                    </Styled.ContentWrapper>
                </Tooltip>
            )}
        </>
    );
};
