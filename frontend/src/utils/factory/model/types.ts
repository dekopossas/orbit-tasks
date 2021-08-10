/* eslint-disable prettier/prettier */
export type genericObject = { [key: string]: genericObject | any };
export type genericModel = Record<string, unknown>;
export type effectCallback = (data: genericObject) => string;
export type crudTypes = "index" | "general" | "show" | "create" | "update" | "delete";

export interface ModelState<T = genericModel> {
  list: {
    data: T[];
    page: number;
    size: number;
    sort?: {
      param: string;
      order: string;
    };
    expand: boolean;
  };
  data: T | false;
}
