import React, { useEffect,useState } from 'react'
import axios from 'axios';

export default function ManufacturerTransactions() {
    const [transactions,setTransactions] = useState([]);
    const getTransactions = async ()=>{
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        console.log(items[0]);
        const result = await axios.get('http://localhost:8000/Manufacturer/getAllTransactions',
        {
            params:{
                accountAddress:items
            }
        })
        setTransactions(result.data);
        console.log(result.data);
    }
    
    useEffect(()=>{
        getTransactions();
    },[])

    return (
    <>
        <div>Transactions</div>
        <table>
            <thead>
                <tr>
                    <th>Sender Address</th>
                    <th>Reciever Address</th>
                    <th>Value(Eth)</th>
                    <th>Gas Used</th>
                    <th>Gas Price</th>
                    <th>Gas Limit</th>
                    <th>Time Stamp</th>
                    <th>Block Number</th>
                    <th>Transaction Hash</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions.map(tx=>{
                        return (
                            <tr>
                                <td>{tx.from}</td>
                                <td>{tx.to}</td>
                                <td>{tx.value}</td>
                                <td>{tx.gasUsed}</td>
                                <td>{tx.gasPrice}</td>
                                <td>{tx.gasLimit}</td>
                                <td>{tx.timeStamp}</td>
                                <td>{tx.minedInBlock}</td>
                                <td>{tx.tHash}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
  )
}
