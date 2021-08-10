export type genericModel = Record<string, unknown>;

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
