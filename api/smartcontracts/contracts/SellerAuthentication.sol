// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SellerAuthentication {

    // Mapping to keep track of authenticated sellers
    mapping (address => bool) authenticated_sellers;
    mapping (uint => address) authenticated_seller_addresses;
    uint authenticated_seller_count;
    address owner;

    event Authenticated (address indexed _from, address indexed _address);
    event Removed(address indexed _from, address indexed _address);


    constructor(){
        owner =  msg.sender;
        authenticated_seller_count = 0;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    function get_authenticated_sellers() public onlyOwner view returns(address[] memory){
        address[] memory ret = new address[](authenticated_seller_count);
        for(uint i = 0 ; i<authenticated_seller_count ; i++){
            ret[i] = authenticated_seller_addresses[i];
        } 
        return ret;
    }

    function authenticate_seller(address _address) public onlyOwner{
        require(authenticated_sellers[_address] == false);
        authenticated_sellers[_address] = true;
        authenticated_seller_addresses[authenticated_seller_count] = _address;
        authenticated_seller_count++;
        emit Authenticated(owner,_address);
    }

    function remove_seller(address _address) public onlyOwner{
        require(authenticated_sellers[_address] == true);
        authenticated_sellers[_address] = false;
        uint index = 0;
        // Find index of item to delete
        for (uint i = 0 ; i<authenticated_seller_count ; i++){
            if(authenticated_seller_addresses[i] == _address){
                index = i;
            }
        }
        // Shift the array items
        for(uint i = index ; i<authenticated_seller_count ; i++){
            authenticated_seller_addresses[i] = authenticated_seller_addresses[i+1];
        }
        // Update the count
        authenticated_seller_count--;
        emit Removed(owner,_address);
    }

    function verify_seller(address _address) public view returns(bool){
        return authenticated_sellers[_address] ? true : false;
    }
}