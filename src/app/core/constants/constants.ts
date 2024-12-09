
export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'https://app-56zqrk46ra-uc.a.run.app';

export const apiEndpoint = {
  TaskEndpoint: {
    getAllTask: `${apiurl}/tasks`,
    addTask: `${apiurl}/tasks`,
    updateTask: `${apiurl}/tasks`,
  },
  UserEndpoint: {
    getUserByEmail: `${apiurl}/users`,
    createUser: `${apiurl}/users`,
  },
};
