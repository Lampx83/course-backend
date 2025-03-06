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
      db.all('SELECT DISTINCT knowledge_block_id, knowledge_block, knowledge_block_min FROM "curriculum_curriculum_subjects"', (err, rows) => {
        if (err) {
          return reject(err);
        }
        // Chuyển đổi kết quả thành mảng các giá trị
        const knowledgeBlocks = rows.map(row => ({
          knowledge_block_id: row.knowledge_block_id,
          knowledge_block: row.knowledge_block,
          knowledge_block_min: row.knowledge_block_min
        }));
        resolve(knowledgeBlocks);
      });
    });
  }
}));
