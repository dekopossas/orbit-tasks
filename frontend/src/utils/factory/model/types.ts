/* eslint-disable prettier/prettier */
export type genericObject = { [key: string]: genericObject | any };
export type genericModel = Record<string, unknown>;
export type effectCallback = (data: genericObject) => string;
export type crudTypes = "index" | "general" | "show" | "create" | "update" | "delete";

export default interface ConfigInterface {
  name: string;
  endpoint: string | {
    general: string | effectCallback;
    index?: string | effectCallback;
    show?: string | effectCallback;
    create?: string | effectCallback;
    update?: string | effectCallback;
    delete?: string | effectCallback;
  };

  mock?: Record<string, any>;

  // -------------------------------------------------
  // Messages
  // -------------------------------------------------

  messages?:{
    // generic error message, could be used instead
    // of manually setting every message.
    error?: string | {
      general: string;
      index?: string | effectCallback;
      show?: string | effectCallback;
      create?: string | effectCallback;
      update?: string | effectCallback;
      delete?: string | effectCallback;
    };

    success: string | {
      general: string;
      index?: string | effectCallback;
      show?: string | effectCallback;
      create?: string | effectCallback;
      update?: string | effectCallback;
      delete?: string | effectCallback;
    };
  };

  // -------------------------------------------------
  // Events
  // -------------------------------------------------

  after?: (dispatch: any) => {
    general?: (response: genericObject, data: genericObject) => void;
    index?: (response: genericObject, data: genericObject) => void;
    show?: (response: genericObject, data: genericObject) => void;
    create?: (response: genericObject, data: genericObject) => void;
    update?: (response: genericObject, data: genericObject) => void;
    delete?: (response: genericObject, data: genericObject) => void;
  }
};

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
