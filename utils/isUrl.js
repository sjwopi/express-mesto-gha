const validator = require('validator');
function isUrl(link) {
  if (!validator.isURL(link)) {
    throw new Error('Неверный формат URL');
  }
  return link;
};

module.exports = { isUrl };
