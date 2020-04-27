import { ChangeEvent } from 'react';

export type OnClickModel = () => void;
export type JsonObj = { [key: string]: string | number | boolean | Date };
export type EventObj = { target: { value: string } };

export type GenericInputEvent = ChangeEvent<HTMLInputElement>;

export type DropdownListModel = {
  text: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
};

export type HasName<T> = {
  name: string;
} & T;

export type Result<T> = {
  message?: string;
  result?: T;
};

export type CountObj = {
  count: number;
};
