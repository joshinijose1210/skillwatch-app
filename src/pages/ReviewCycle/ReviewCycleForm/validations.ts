// @ts-nocheck

import { DateRangeType } from '@medly-components/core';
import { max } from 'date-fns';
import { ReviewCycleFormInputs } from './types';

export const dateRangeValidations = (name: string, value: DateRangeType, inputs: ReviewCycleFormInputs) => {
    let maxDate;
    if (inputs.selfReview.endDate && inputs.managerReview.endDate) {
        maxDate = max([inputs.selfReview.endDate, inputs.managerReview.endDate]);
    }
    switch (name) {
        case 'reviewCycle':
            if (Object.values(value).includes(null)) {
                return 'Please select both values';
            } else if (value.startDate > value.endDate) {
                return 'Start date cannot be greater than end date.';
            } else {
                return '';
            }
        case 'selfReview':
            if (Object.values(value).includes(null)) {
                return 'Please select both values.';
            } else if (
                value.startDate < inputs.reviewCycle.startDate ||
                value.startDate > inputs.reviewCycle.endDate ||
                value.endDate > inputs.reviewCycle.endDate ||
                value.endDate < inputs.reviewCycle.startDate
            ) {
                return 'Self review dates should be in between review cycle dates.';
            } else if (value.startDate > value.endDate) {
                return 'Start date cannot be greater than end date.';
            } else {
                return '';
            }
        case 'managerReview':
            if (Object.values(value).includes(null)) {
                return 'Please select both values.';
            } else if (
                value.startDate < inputs.reviewCycle.startDate ||
                value.startDate > inputs.reviewCycle.endDate ||
                value.endDate > inputs.reviewCycle.endDate ||
                value.endDate < inputs.reviewCycle.startDate
            ) {
                return 'Manager review should start after self review and end on or before review cycle.';
            } else if (value.startDate > value.endDate) {
                return 'Start date cannot be greater than end date.';
            } else {
                return '';
            }
        case 'checkInWithManager':
            if (Object.values(value).includes(null)) {
                return 'Please select both values.';
            } else if (
                value.startDate < inputs.reviewCycle.startDate ||
                value.startDate > inputs.reviewCycle.endDate ||
                value.startDate <= maxDate ||
                value.endDate > inputs.reviewCycle.endDate ||
                value.endDate < inputs.reviewCycle.startDate ||
                value.endDate < maxDate
            ) {
                return 'Check-in with Manager should start after self & manager review and end on or before review cycle.';
            } else if (value.startDate > value.endDate) {
                return 'Start date cannot be greater than end date.';
            } else {
                return '';
            }
    }
};
