import { addBusinessDays, addDays, format, parse } from 'date-fns';
import appSettings from 'appSettings.json';
import layoutSettings from 'layout.json';

const { formatDate, checkout } = appSettings;

export const calculateCheckout = (date = new Date()) =>
  checkout.isBusinessDays
    ? addBusinessDays(date, checkout.daysAllowedOut)
    : addDays(date, checkout.daysAllowedOut);

export const calculateReturnOnDateForDbInsert = (date = new Date()) => {
  return format(calculateCheckout(date), formatDate.from);
};

export const calculateReturnOnDateForClient = (date = new Date()) => {
  return format(calculateCheckout(date), formatDate.to);
};

export const formatDateForDbInsert = (date = new Date()) => {
  return format(date, formatDate.from);
};

export const formatDateForClient = (date = new Date()) => {
  return format(date, formatDate.to);
};

export const friendlyClientDateFormatFromString = (date: string) => {
  const result = format(
    parse(date, appSettings.formatDate.from, new Date()),
    appSettings.formatDate.to
  );
  return result;
};

export type LayoutModel = {
  label: string;
  icon: string;
  path?: string;
  menuItems?: LayoutModel[];
};

export const mapWindowPathNameToPageTitle = (currentPath: string) => {
  for (const item of layoutSettings.mainMenu) {
    if (item.path && item.path === currentPath) return item.label;

    if (item.menuItems) {
      const title = item.menuItems.find(i => i.path === currentPath);
      if (title) return title.label;
    }
  }
  return 'No title.';
};
