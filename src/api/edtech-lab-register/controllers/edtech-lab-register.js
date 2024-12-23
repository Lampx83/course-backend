'use strict';
const {EdtechLabRegisterNotify, EdtechLabRegisterResponse} = require("../../../resources/emailTemplates/index");

/**
 * edtech-lab-register controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::edtech-lab-register.edtech-lab-register', ({ strapi }) => ({
  async create(ctx) {
    const res = await strapi.service('api::edtech-lab-register.edtech-lab-register').create(ctx.request.body);
    
    let emailHtmlResponse = EdtechLabRegisterResponse;
    let emailHtmlNotify = EdtechLabRegisterNotify;
    for (let key in res) {
      emailHtmlResponse = emailHtmlResponse.replaceAll(`{{${key}}}`, res[key]);
      emailHtmlNotify = emailHtmlNotify.replaceAll(`{{${key}}}`, res[key]);
    }
    
    const resEmailUser = await strapi.plugins['email'].services.email.send({
      to: res.personalEmail,
      subject: "Xác nhận: Chúng tôi đã nhận được đơn đăng ký của bạn!",
      text: "Xác nhận: Chúng tôi đã nhận được đơn đăng ký của bạn!",
      html: emailHtmlResponse
    });
    
    const resEmailAdmin = await strapi.plugins['email'].services.email.send({
      to: "thaofami@gmail.com",
      subject: "Thông báo người đăng ký Edtech lab mới",
      text: "Thông báo người đăng ký Edtech lab mới",
      html: emailHtmlNotify
    });
    
    return {
        data: res
    }
  }
}));
