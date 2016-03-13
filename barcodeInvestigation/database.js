var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sendMail = require('./mail.js')


mongoose.connect ('mongodb://localhost/Users',function(err)
{
	if(err) console.log(err);
	else console.log('database connected');
})

console.log(mongoose.connection.host);
console.log(mongoose.connection.port);
var User = new Schema({
	name:String,
	mobileNo: String,
	email:String,
	college: String,
	hash : String,
	sentMail:Boolean,
})

var barcodeDb = mongoose.model('barcodes',User);


barcodeDb.insert = function(name,mobileNo,email,college,hash,callback)
{
		var newUser = barcodeDb({
			name : name,
			mobileNo: mobileNo,
			email:email,
			college:college,
			hash:hash,
			sentMail : false
		})
		sendMail(email,hash,function(err,response)
			{
				if(err) 
					{
						console.log(err);
						return;
					}
				console.log(response.message);
				newUser.sentMail = true;
				
				newUser.save(function(err)
				{
					console.log('saved');
					console.log(newUser);
					return callback(err,newUser);
				});
			});
		
}

barcodeDb.lookupUser = function(email,callback)
{
	barcodeDb.findOne({email:email},function(err,user)
	{
		return callback(err,user);
	})
}

barcodeDb.deleteUser = function(password,hash,callback)
{

	if(password != "tejas") return ;
	barcodeDb.remove({hash:hash},function(err)
	{
		return callback(err);
	})
}

module.exports = barcodeDb