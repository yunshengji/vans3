export default {
  'GET /api/401': (req, res) => {
    setTimeout(() => {
      res.status(401).send({
        code: 0,
        message: 'Unauthorized',
      });
    }, 1200);
  },
  'GET /api/403': (req, res) => {
    setTimeout(() => {
      res.status(403).send({
        code: 0,
        message: 'Forbidden',
      });
    }, 1200);
  },
  'GET /api/404': (req, res) => {
    setTimeout(() => {
      res.status(404).send({
        code: 0,
        message: 'Not Found',
      });
    }, 1200);
  },
  'GET /api/500': (req, res) => {
    setTimeout(() => {
      res.status(500).send({
        code: 0,
        message: 'Not Found',
      });
    }, 1200);
  },
  'POST /api/Login': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          token: 'tokenBear',
        },
      });
    }, 1200);
  },
  'GET /api/Me': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: 'success',
        data: {
          username: 'dengqiyao',
          nickname: '郑晓媛',
          avatar: 'https://secure.gravatar.com/avatar/d99aea9fb2d3789b950b80483d37e37a?s=220&r=X&d=mm',
          role: 'admin',
        },
      });
    }, 1200);
  },
};
