export default {
  'POST /api/login': (req, res) => {
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
};
