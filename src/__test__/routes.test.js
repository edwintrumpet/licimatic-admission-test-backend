const routes = require('../routes');
const testServer = require('../utils/testServer');

const request = testServer(routes);

describe('Routes', () => {
  describe('/opportunities', () => {
    it('Should return status 200', () => request.get('/opportunities').then((response) => expect(response.statusCode).toBe(200)));
  });
});
