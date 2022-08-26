// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SellerAuthentication {

    // Mapping to keep track of authenticated sellers
    mapping (address => bool) authenticated_sellers;
    address owner;

    event Authenticated (address indexed _from, address indexed _address);
    event Removed(address indexed _from, address indexed _address);


    constructor(){
        owner =  msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    function authenticate_seller(address _address) public onlyOwner{
        require(authenticated_sellers[_address] == false);
        authenticated_sellers[_address] = true;
        emit Authenticated(owner,_address);
    }

    function remove_seller(address _address) public onlyOwner{
        require(authenticated_sellers[_address] == true);
        authenticated_sellers[_address] = false;
        emit Removed(owner,_address);
    }

    function verify_seller(address _address) public view returns(bool){
        return authenticated_sellers[_address] ? true : false;
    }
}