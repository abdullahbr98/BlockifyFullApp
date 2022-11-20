var ethers = require("ethers");
const {
  SELLER_AUTHENTICATION_ABI,
  SELLER_AUTHENTICATION_BYTE_CODE,
  PRODUCTS_ABI,
  PRODUCTS_BYTE_CODE,
} = require("../utils/Constants/ManufacturerSMConstants");

// helper functions
const getAuthContractInstance = async function (url, accountAddress) {
  // create a signer
  const signer = new ethers.providers.JsonRpcProvider(url).getSigner(
    accountAddress
  );

  // create contract instance
  const SellerAuthenticationContract = new ethers.ContractFactory(
    SELLER_AUTHENTICATION_ABI,
    SELLER_AUTHENTICATION_BYTE_CODE,
    signer
  );

  // Deploying Authenticate Seller Contract for the Manufacturer
  console.log(`Deploying from account : ${signer._address}`);
  const authContract = await SellerAuthenticationContract.deploy();
  await authContract.deployed();

  console.log(
    `Seller Authentication Contract Deployed at Address : ${authContract.address}`
  );

  return authContract;
};

const getProductContractInstance = async function (url,accountAddress) {
  // create a signer
  const signer = new ethers.providers.JsonRpcProvider(url).getSigner(
    accountAddress
  );

  const ProductsContract = new ethers.ContractFactory(
    PRODUCTS_ABI,
    PRODUCTS_BYTE_CODE,
    signer
  );

  // Deploying Products Contract for the Manufacturer
  console.log(`Deploying from account : ${signer._address}`);
  const productsContract = await ProductsContract.deploy();
  await productsContract.deployed();

  console.log(
    `Products Contract Deployed at Address : ${productsContract.address}`
  );

  return productsContract;
};

module.exports = { getAuthContractInstance, getProductContractInstance };
