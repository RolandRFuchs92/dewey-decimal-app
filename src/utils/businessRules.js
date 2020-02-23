import { addBusinessDays, addDays, format } from 'date-fns';
import appSettings from 'appSettings';

const { formatDate, checkout } = appSettings;

export const calculateCheckout = (date = new Date()) => 
    checkout.isBusinessDays 
        ? addBusinessDays(date, checkout.daysAllowedOut) 
        : addDays(checkout.daysAllowedOut);

export const calculateReturnOnDateForDbInsert = (date = new Date()) => {
    return format(calculateCheckout(date), formatDate.from);
}

export const calculateReturnOnDateForClient = (date = new Date()) => {
    return format(calculateCheckout(date), formatDate.to);
}

export const formatDateForDbInsert = (date = new Date()) => {
    return format(date, formatDate.from);
}

export const formatDateForClient = (date = new Date()) => {
    return format(date, formatDate.to);
}