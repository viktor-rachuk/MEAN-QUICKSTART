const path = require('path');
const fs = require("fs");
const historyPath = appRoot + '/public/data/history/';


exports.download_order = (req, res) => {
	const file_path = historyPath + 'collection/' + 'order_collections.xml'
	if (fs.existsSync(file_path)) {
		fs.writeFileSync(file_path, '');
	} else {
		fs.writeFileSync(file_path, '');
	}
	readFiles(historyPath + 'order/')
	  .then( allContents => {
	  	fs.appendFile(file_path, allContents, 'utf8',  (error) =>  {
				if (error) return res.json({success: false, msg: 'There is no any records'});
				res.download(file_path);
			});
	  }, error => console.log(error));
};

exports.download_remittance = (req, res) => {
	const file_path = historyPath + 'collection/' + 'remittance_collections.xml'
	if (fs.existsSync(file_path)) {
		fs.writeFileSync(file_path, '');
	} else {
		fs.writeFileSync(file_path, '');
	}
	readFiles(historyPath + 'remittance/')
	  .then( allContents => {
	  	fs.appendFile(file_path, allContents, 'utf8',  (error) =>  {
				if (error) return res.json({success: false, msg: 'There is no any records'});
				res.download(file_path);
			});
	  }, error => console.log(error));
};

exports.auto_backup = () => {
	const remittance_path = historyPath + 'collection/' + 'remittance_collections.xml';
	const order_path = historyPath + 'collection/' + 'order_collections.xml';
	readFiles(historyPath + 'remittance/')
	  .then( allContents => {
	  	fs.writeFileSync(remittance_path, allContents, 'utf8');
	  }, error => console.log(error));
	readFiles(historyPath + 'order/')
	  .then( allContents => {
	  	fs.writeFileSync(order_path, allContents, 'utf8');
	  }, error => console.log(error));
}

const readFiles = (dirname) => {

  const readDirPr = new Promise( (resolve, reject) => {
    fs.readdir(dirname,
      (err, filenames) => (err) ? reject(err) : resolve(filenames))
  });

  return readDirPr.then( filenames => Promise.all(filenames.map((filename) => {
      return new Promise ( (resolve, reject) => {
        fs.readFile(dirname + filename, 'utf-8',
          (err, content) => (err) ? reject(err) : resolve(content));
      })
    })).catch( error => Promise.reject(error)))
};