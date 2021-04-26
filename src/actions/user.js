import { USER } from './index';

const actionUser = (username, email, password) => ({
  type: USER,
  payload: {
    username,
    email,
    password,
  },
});

export default actionUser;
