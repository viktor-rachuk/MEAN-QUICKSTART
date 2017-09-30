const express = require("express");
const router = express.Router();
const async = require('async');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const mg = require('nodemailer-mailgun-transport');
const EmailTemplate = require('email-templates').EmailTemplate;
const pug = require('pug');
const path = require('path');
const api_key = 'your-key';
const domain = 'your-domain';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const historyController = require('../controllers/historyController');
const Company = require('../models/company');
router.post('/', async (req, res) => {
    const support_email = req.body.support_email; // support office  email address
    const sender_email = req.body.sender_email; // sender email address
    const accounttype = req.body.accounttype;
    let top_company = '';
    // create reusable transporter object using the default SMTP transport
    const temp_company =  await Company.findOne({$or: [{parent: null}, {parent: ''}]}).exec();
    if (temp_company) {
        top_company = temp_company.name;
    }
    const content = {
        'invoices': req.body.data,
        'totalamount': req.body.totalamount,
        'totalbal': req.body.totalbal,
        'user': req.body.user,
        'accounttype': 'support',
        'created_at': req.body.created_at,
        'company' : top_company
    };
    send_mail('email', content, support_email, (success) => {
        if (success === true) {
            content.accounttype = req.body.accounttype;
            send_mail('email', content, sender_email, (success) => {
                if (success === true) {
                    // proceess history controller
                    historyController.recordRemittance(req.body, (history) => {
                        if (history.success) {
                            res.json({ success: true, msg: 'Sent Successfuly' });
                        } else {
                            res.json({ success: true, msg: 'Sent Successfuly, but cannot save xml file!' });
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            });
        } else {
            return res.json({success: false});
        }
    });
});
router.post('/order', async (req, res) => {
    const sender_email = req.body.sender_email; // sender email address
    const staff_email = req.body.staff_email; //store email address
    const store_email = req.body.store_email; // key staff email address
    const contractor_info = req.body.contractor_info;
    const address = contractor_info.info.address;
    const info = contractor_info.info;
    let top_company = '';
    // create reusable transporter object using the default SMTP transport
    const temp_company =  await Company.findOne({$or: [{parent: null}, {parent: ''}]}).exec();

    if (temp_company) {
        top_company = temp_company.name;
    }
    const content = {
        'client_info': req.body.client_info,
        'contractor_info': contractor_info,
        'project_detail': req.body.project_detail,
        'info': info,
        'address': address,
        'areas': req.body.areas,
        'user': req.body.user,
        'receiver': 'sender',
        'created_at': req.body.created_at,
        'company': top_company,
        'accounttype': req.body.accounttype
    };

    send_mail('order', content, sender_email, (result1) => {
        if (result1) {
            content.receiver = 'staff and store';
            send_mail('order', content, staff_email+','+store_email, (result2) => {
                if (result2) {
                    // proceess history controller
                    historyController.recordOrder(req.body, (order) => {
                        if (order.success) {
                            res.json({ success: true, msg: 'Sent Successfuly' });
                        } else {
                            res.json({ success: true, msg: 'Sent Successfuly, but cannot save xml file!' });
                        }
                    });
                } else {
                    return res.json({success: false});
                }
            })
        } else {
            return res.json({success: false});
        }
    } );
});

const send_mail = (template_path, content, receiver, callback ) => {  /* path is email tempalte path, content is data to send, receiver is email address*/
    const templateDir = path.join('public', 'template', template_path);
    let subject = '';
    if (template_path === 'email') {
        subject = 'Send Remittance Advice';
    } else {
        subject = 'Flooring Order Request ';
    }
    const myTemplate = new EmailTemplate(templateDir);
    myTemplate.render(content, (err, result) => {
        if (err) callback(false);
        if (result.html) {
            const data = {
                from: 'John Doe<no-reply@john.doe>',
                to: receiver,
                subject: subject,
                text: subject,
                html: result.html
            }
            mailgun.messages().send(data, (error, body) => {
                if (error) return callback(false);
                callback(true);
            });
        } else {
            return callback(false);
        }
    });
};
module.exports = router;
