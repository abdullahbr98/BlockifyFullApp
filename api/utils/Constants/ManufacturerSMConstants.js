const SellerAuthentication = require("../../smartcontracts/build/contracts/SellerAuthentication");
const SELLER_AUTHENTICATION_ABI = SellerAuthentication.abi;
const SELLER_AUTHENTICATION_BYTE_CODE = SellerAuthentication.bytecode;

const Products = require('../../smartcontracts/build/contracts/Products')
const PRODUCTS_ABI = Products.abi;
const PRODUCTS_BYTE_CODE = Products.bytecode;


module.exports = { SELLER_AUTHENTICATION_ABI, SELLER_AUTHENTICATION_BYTE_CODE, PRODUCTS_ABI, PRODUCTS_BYTE_CODE };
