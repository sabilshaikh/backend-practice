

const ImageKit = require("@imagekit/nodejs");

const imgKit = new ImageKit({
    privateKey: process.env.PRIVATE_KEY,
  
    
});




module.exports = imgKit;