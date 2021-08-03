export interface Model {
  username: string;
  password: string;
}

export interface loginRequestResponse {
  token: string;
  accessToken: string;
  expiration: string;
}

export interface ITenant {
  created_at: string;
}
