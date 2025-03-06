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
        const years = rows.map(row => row.year).filter(year => !!year).sort((a, b) => b.localeCompare(a));
        resolve(years);
      });
    });
  },

  async getKnowledgeBlocks(query) {
    return new Promise((resolve, reject) => {
      const knowledgeBlocksByLocale = {};

      const locales = ['vi', 'en'];

      const promises = locales.map((locale) => {
        return new Promise((resolveLang, rejectLang) => {
          db.all(
            'SELECT DISTINCT knowledge_block_id, knowledge_block, knowledge_block_min FROM "curriculum_curriculum_subjects" WHERE locale = ?',
            [locale],
            (err, rows) => {
              if (err) {
                return rejectLang(err);
              }
              knowledgeBlocksByLocale[locale] = rows.map(row => ({
                knowledge_block_id: row.knowledge_block_id,
                knowledge_block: row.knowledge_block,
                knowledge_block_min: row.knowledge_block_min,
              }));
              resolveLang();
            }
          );
        });
      });

      Promise.all(promises)
        .then(() => resolve(knowledgeBlocksByLocale))
        .catch(reject);
    });
  }
}));
