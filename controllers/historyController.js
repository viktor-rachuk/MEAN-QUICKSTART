const History = require('../models/history');
const builder = require('xmlbuilder');
const path = require('path');
const fs = require("fs");
const historyPath = appRoot + '/public/data/history/';

exports.history_list = (req, res, next) => {
	History.find((err, histories) => {
		if (err) return next(err);
		res.json(histories);
	});
};

exports.recordRemittance = (content, callback) => {
	const user = content.user;
	const created_at = content.created_at;
	const invoices = content.data;
	createRemittance(content, (path) => {
		const history = {
			'user': user,
			'created_at': created_at,
			'type': 'remittance',
			'path': path
		}
    History.create(history, (err, history) => {
        if (err) callback({ success: false, error: err });
        return callback({ success: true, msg: 'Success!' });
    });
	});
};

  exports.recordOrder = (content, callback) => {
    const user = content.user;
    const created_at = content.created_at;
    createOrder(content, (path) => {
      console.log('path ' + path);
      const history = {
        'user': user,
        'created_at': created_at,
        'type': 'order',
        'path': path
       }
      History.create(history, (err, history) => {
        if (err) callback({ success: false, error: err });
        return callback({ success: true, msg: 'Success!' });
      });
    });
  };

  function createRemittance(content, callback) {
  	const doc = builder.create('remittance', { encoding: 'utf-8' });
  	const user = doc.ele('user').txt(content.user);
  	const created_at = content['created_at'];
  	doc.ele('created_at').txt(created_at);
  	doc.ele('type').txt('remittance');
  	const data =  doc.ele('data');
  	for (let i = 0; i < content.data.length; i ++) {
  		const invoice = data.ele('row');
  		invoice.att('No', i);
  		invoice.ele('store').txt(content.data[i].store);
  		invoice.ele('invnum').txt(content.data[i].invnum);
  		invoice.ele('invdate').txt(content.data[i].invdate);
  		invoice.ele('village').txt(content.data[i].village);
  		invoice.ele('ponum').txt(content.data[i].ponum);
  		invoice.ele('balance').txt(content.data[i].balance);
  		invoice.ele('amounttopay').txt(content.data[i].amounttopay);
  	}
  	saveLog(doc.toString({pretty: true}),'remittance', (path) => {
  		callback(path);
  	});
  }

  function createOrder(content, callback) {
    const doc = builder.create('order', { encoding: 'utf-8' });
    const user = doc.ele('user').txt(content.user);
    const created_at = content['created_at'];
    doc.ele('created_at').txt(created_at);
    doc.ele('type').txt('order');
    const data = doc.ele('data');
    const client =  data.ele('client')
    client.ele('village').txt(content['client_info'].village);
    client.ele('name').txt(content['client_info'].name);
    client.ele('email').txt(content['client_info'].email);
    client.ele('phone').txt(content['client_info'].phone);
    client.ele('mobile').txt(content['client_info'].mobile);
    const contractor = data.ele('contractor');
    contractor.ele('staff').txt(content['contractor_info'].staff);
    contractor.ele('email').txt(content['contractor_info'].email);
    contractor.ele('phone').txt(content['contractor_info'].phone);
    contractor.ele('mobile').txt(content['contractor_info'].mobile);
    contractor.ele('store').txt(content['contractor_info'].store);
    contractor.ele('store_email').txt(content['contractor_info'].store_email);
    const contractor_info = contractor.ele('info');
    contractor_info.ele('phone').txt(content['contractor_info']['info'].phone);
    contractor_info.ele('mobile').txt(content['contractor_info']['info'].mobile);
    contractor_info.ele('email').txt(content['contractor_info']['info'].email);
    contractor_info.ele('fax').txt(content['contractor_info']['info'].fax);
    const contractor_info_address = contractor_info.ele('address');
    contractor_info_address.ele('address1').txt(content['contractor_info']['info']['address'].address1);
    contractor_info_address.ele('address2').txt(content['contractor_info']['info']['address'].address2);
    contractor_info.ele('city').txt(content['contractor_info']['info'].city);
    contractor_info.ele('region').txt(content['contractor_info']['info'].region);
    contractor_info.ele('postcode').txt(content['contractor_info']['info'].postcode);
    contractor_info.ele('country').txt(content['contractor_info']['info'].city);
    const project = data.ele('project_detail');
    project.ele('order_number').txt(content['project_detail'].order_number);
    project.ele('order_date').txt(content['project_detail'].order_date);
    project.ele('install_date').txt(content['project_detail'].install_date);
    project.ele('quote').txt(content['project_detail'].quote);
    project.ele('unit_number').txt(content['project_detail'].unit_number);
    project.ele('unit_type').txt(content['project_detail'].unit_type);
    project.ele('plan_type').txt(content['project_detail'].plan_type);
    project.ele('colour_scheme').txt(content['project_detail'].colour_scheme);
    project.ele('special').txt(content['project_detail'].special);
    const area = data.ele('areas');
    area.ele('entire').txt(content['areas'].entire);
    area.ele('carpet').txt(content['areas'].carpet);
    area.ele('kitchen').txt(content['areas'].kitchen);
    area.ele('bathroom').txt(content['areas'].bathroom);
    area.ele('laundry').txt(content['areas'].laundry);
    area.ele('other').txt(content['areas'].other);
    saveLog(doc.toString({pretty: true}), 'order', (path) => {
      callback(path);
    });
  }

  function saveLog(content, type, callback) {
    const filename = Date.now() + '.xml';
  	const path = historyPath + type + '/' + filename;
  	fs.writeFile(path, content, 'utf8', (err) => {
  		if (err) return;
  		return callback(filename);
  	});
  }