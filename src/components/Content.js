import React, { useState, useEffect } from 'react';
import PurchaseList from './PurchaseList';
import AddPurchase from './AddPurchase';
import CostList from './CostList';
import AddCost from './AddCost';
import ReportCost from './ReportCost';
import ReportPurchase from './ReportPurchase'
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
    } else if (menuKey.includes('10')) {
        return (
            <CostList />
        )
    } else if (menuKey.includes('11')) {
        return (
            <AddCost />
        )
    } else if (menuKey.includes('20')) {
        return (
            <ReportPurchase />
        )
    } else if (menuKey.includes('21')) {
        return (
            <ReportCost />
        )
    } else {
        return (
            <div></div>
        );
    }
}

export default Content;