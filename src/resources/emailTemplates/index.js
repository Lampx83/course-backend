const fs = require('node:fs');

const confirmContactInfo = fs.readFileSync(`${__dirname}/xac_nhan_fit_2.html`, 'utf8');

const EdtechLabRegisterResponse = fs.readFileSync(`${__dirname}/EdtechLabRegisterResponse.html`, 'utf8');

const EdtechLabRegisterNotify = fs.readFileSync(`${__dirname}/EdtechLabRegisterNotify.html`, 'utf8');

module.exports = {
  confirmContactInfo,
  EdtechLabRegisterResponse,
  EdtechLabRegisterNotify,
}