const Web3 = require("web3");
const Web3Extend = require("skm-web3-extended");
const Secp256k1 = require("secp256k1");
const CryptoJS = require('crypto-js')

var web3 = new Web3("http://54.196.216.49:10101");
Web3Extend.extend(web3);


exports.getUserInfo = function (address) {
    return web3.skm.getUser(address);
}

exports.getUsers = function () {
    return web3.skm.getUsers();
}

exports.getUsers = function () {
    return web3.skm.getUsers();
}

exports.sign = function (data, privateKey) {
    return web3.eth.accounts.sign(data, privateKey)
}

exports.ecdh = function (privateKey, publicKey) {
    publicKey = Buffer.from("04" + publicKey.replace("0x", ""), "hex");
    privateKey = Buffer.from(privateKey.replace("0x", ""), "hex");
    return Secp256k1.ecdh(publicKey, privateKey);
}

exports.encrypt = function (data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}

exports.decrypt = function (ciphertext, key) {
    return CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
}

exports.register = function (privateKey, publicKey, nickname) {
    var data = "0x" + web3.skm.buildRegisterData(nickname, Buffer.from(publicKey.replace("0x", ""), "hex")).toString("hex")

    var tx = {
        to: web3.skm.consts.calls.register,
        data: data,
        gas: 100000
    }
    web3.eth.accounts.signTransaction(tx, privateKey).then(signTx => {
        web3.eth.sendSignedTransaction(signTx.rawTransaction)
            .on('receipt', console.log);
    })
}

