'use strict';
const {confirmContactInfo} = require("../../../resources/emailTemplates/index");

/**
 * contact-infor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact-infor.contact-infor', ({strapi}) => ({
    async create(ctx) {
        const res = await strapi.service('api::contact-infor.contact-infor').create(ctx.request.body);

        let emailHtml = confirmContactInfo;
        for (let key in res) {
            emailHtml = emailHtml.replaceAll(`{{${key}}}`, res[key]);
        }

        const resEmailUser = await strapi.plugins['email'].services.email.send({
            to: res.email,
            subject: "Xác nhận: Chúng tôi đã nhận được thông tin của bạn!",
            text: "Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ với bạn sớm nhất có thể!",
            html: emailHtml
        });

        const resEmailAdmin = await strapi.plugins['email'].services.email.send({
            to: "lampx@neu.edu.vn",
            subject: `Thông báo: Yêu cầu liên hệ từ web FIT từ ${res.fullName}!`,
            text: `Có một yêu cầu liên hệ mới từ ${res.fullName}`,
            html: emailHtml
        });

        return {
            data: res
        }
    }
}));
