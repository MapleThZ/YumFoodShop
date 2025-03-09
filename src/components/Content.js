import React, { useState, useEffect } from 'react';
import PurchaseList from './PurchaseList';
import AddPurchase from './AddPurchase';

const Content = ({ menuKey }) => {

    useEffect(() => {
    }, [menuKey]);

    console.log(menuKey)

    if (menuKey.includes('00')) {
        return (
            <PurchaseList />
        )
    } else if (menuKey.includes('01')) {
        return (
            <AddPurchase />
        )
    } else {
        return (
            <div></div>
        );
    }
}

export default Content;