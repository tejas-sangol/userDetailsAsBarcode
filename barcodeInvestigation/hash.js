

module.exports.createHash = function(name,mobileNo,email,college,callback)
{
	
	var crypto = require('crypto');
	var hash = crypto.createHash('sha256');


	return hash.update(name + '|' + mobileNo + '|' + email + '|' + college).digest('base64').substr(0,25);
}

module.exports.generateBarcode = function(email,hash, callback)
{
	var exec = require('child_process').exec
	var path = require('path');
	

	//var command =  "pybarcode2 create -b ean8 -t jpeg \""+ hash +"\"" + hash
	var command =  "pybarcode2 create -b code39 -t jpeg \"" + hash + "\" " + './barcodes/'  + email
	exec(command,{cwd : process.cwd()},function(error,stdout,stderr)
		{
			if(error) return callback(error);

			else if (stdout) console.log(stdout);
			else console.log(stderr);
			return callback(null);
		});
}