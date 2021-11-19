import AuthService from '@/services/authService';

const state = {
  authenticated: false,
  accessToken: localStorage.getItem('accessToken') || '',
};

const getters = {
  token: state => {
    return state.accessToken;
  },
};

const actions = {
  login: ({ commit }, credentials) => {
    commit('CLEAN_LOCAL_STORAGE');
    commit('SET_AUTH_STATUS', false);
    return new Promise((resolve, reject) => {
      AuthService.login(credentials.username, credentials.password)
        .then(response => {
          commit('SET_ACCESS_TOKEN', response.data.access_token);
          commit('SET_AUTH_STATUS', true);
          resolve({
            status: 'ok',
            response: response.data,
          });
        })
        .catch(err => reject(err));
    });
  },
  logout: ({ commit }) => {
    return new Promise(resolve => {
      commit('CLEAN_LOCAL_STORAGE');
      commit('SET_AUTH_STATUS', false);
      resolve({
        data: {
          status: 'ok',
        },
      });
    });
  },
  validate: ({ commit }, token) => {
    commit('SET_AUTH_STATUS', false);
    return new Promise((resolve, reject) => {
      AuthService.validate(token)
        .then(response => {
          console.log('token validated');
          commit('SET_AUTH_STATUS', true);
          resolve({
            data: {
              status: 'ok',
              response: response.data,
            },
          });
        })
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token;
  },
  SET_AUTH_STATUS: (state, status) => {
    state.authenticated = status;
  },
  CLEAN_LOCAL_STORAGE: () => {
    localStorage.removeItem('accessToken');
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
