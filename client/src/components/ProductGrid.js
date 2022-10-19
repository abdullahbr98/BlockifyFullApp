import React from 'react'
import SellerProductAccordion from "../components/SellerProductAccordion"
function productList(val) {
    return (
        <SellerProductAccordion
            productName={val.productName}
            description={val.description}
            price={val.price}
        />
    );
}
export default function SellerProductGrid(props) {
  return (
    <>
        {props.array.map(productList)}
    </>
  )
}
