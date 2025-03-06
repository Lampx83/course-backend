'use strict';
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(process.cwd() + '/.tmp/data.db');

/**
 * curriculum-curriculum service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::curriculum-curriculum.curriculum-curriculum', ({ strapi }) => ({
  async getYears(query) {
    return new Promise((resolve, reject) => {
      db.all('SELECT DISTINCT year FROM "curriculum_curricula"', (err, rows) => {
        if (err) {
          return reject(err);
        }
        const years = rows.map(row => row.year).filter(year => !!year).sort((a, b) => b.year.localeCompare(a.year));
        resolve(years);
      });
    });
  }
}));
