const api = {
  getUserInfo: [
    'get',
    '/api/getUserInfo',
    { expect: () => false, initialVal: 123 },
  ],
  getRootInfo: [
    'get',
    '/api/getRootInfo',
    { expect: (data: any) => true, initialVal: undefined, retry: { times: 3 } },
  ],
};

const request = {
  success(req) {
    return req;
  },

  error(err) {},
};

const response = {
  success(res) {
    return res.data.data;
  },

  error(err) {},
};

const config = {
  baseURL: 'http://mock.pingpongx.org/mock/199',
};

export default {
  api,
  request,
  response,
  config,
};
