import React, { useState, useEffect } from 'react';
import PurchaseList from './PurchaseList';
import AddPurchase from './AddPurchase';
import eventEmitter from './utils/EventEmitter';

const MainProductMasterData = () => {

    const fetchData = async () => {
        const response = await fetch('/api/read-excel-master-main-product');
        const result = await response.json();

        eventEmitter.emit('MainProduct', result);
    };

    fetchData();

}

const AdditionalProductMasterData = () => {

    const fetchData = async () => {
        const response = await fetch('/api/read-excel-master-additional-product');
        const result = await response.json();

        eventEmitter.emit('AdditionalProduct', result);
    };

    fetchData();
}

const PlatformMasterData = () => {

    const fetchData = async () => {
        const response = await fetch('/api/read-excel-master-platform');
        const result = await response.json();

        eventEmitter.emit('Platform', result);
    };

    fetchData();
}

const Content = ({ menuKey }) => {

    // useEffect(() => {
    // }, []);

    useEffect(() => {
        MainProductMasterData()
        AdditionalProductMasterData()
        PlatformMasterData()
    }, [menuKey]);

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