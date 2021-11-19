export default {
  login: (username, password) => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(username, password);
        resolve({
          data: {
            access_token: 'access_token',
          },
        });
      }, 5000);
      // reject(error);
    });
  },

  validate: token => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(token);
        resolve({
          data: {
            access_token: 'access_token',
          },
        });
      }, 5000);
      // reject(error);
    });
  },
};
