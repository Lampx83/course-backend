const fs = require('node:fs');

const confirmContactInfo = fs.readFileSync(`${__dirname}/xac_nhan_fit_2.html`, 'utf8');

module.exports = {
  confirmContactInfo
}