export type Response = {
  data: string | null;
  token?: string;
  id?: number;
  message?: string;
  galleries?: Array<{}>;
};
