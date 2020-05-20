const Cookies = require('js-cookie');
const { prefix } = require('../../config/api');

const getFileURL = id => {
  const token = Cookies.get('token');
  return id && `${prefix}/download/${id}?token=${token}`;
};

module.exports = {
  getFileURL,
};
