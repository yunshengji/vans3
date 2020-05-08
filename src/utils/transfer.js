import { prefix } from '../../config/api';

const getFileURL = (id) => {
  if (id) {
    return `${prefix}/download/${id}`;
  } else {
    return ``;
  }
};

export {
  getFileURL,
};
