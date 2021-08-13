// Utils
import modelFactory from '../../utils/factory/model'

import { Model, loginRequestResponse, ITenannt } from "./types";

const INITIAL_STATE = {
  user_id: "user_id",
  username: "username",
  name: null,
  tenants: [],
};

export default modelFactory<Model>({
  name: "login",
  endpoint: {
    general: "auth",
  },

  state: {
    user: INITIAL_STATE,
    errors: {},
    redirect: true,
    logged: false,
  },

  reducers: {
    setUser: (state, value) => {
      return { ...state, user: value };
    },
    setLogged: (state, value) => {
      return { ...state, user: value };
    },
  },
  
});
