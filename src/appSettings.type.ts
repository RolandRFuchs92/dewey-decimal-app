import appSettings from 'appSettings.json';

const { tables } = appSettings;

export type TableNames = keyof typeof tables;
export type AppsettingsModel = typeof appSettings;
