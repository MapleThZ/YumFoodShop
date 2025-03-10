import React, { useState, useEffect } from 'react';
import PurchaseList from './PurchaseList';
import AddPurchase from './AddPurchase';
import eventEmitter from './utils/EventEmitter';

const MainProductMasterData = () => {

    // const { emit } = useEventEmitter();
    // const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch('/api/read-excel-master-main-product');
        const result = await response.json();

        eventEmitter.emit('MainProduct', result);

        // console.log('MainProductMasterData ', result)
        sessionStorage.setItem('MainProduct', 'YES');
        // setData(result);
    };

    fetchData();

}

const AdditionalProductMasterData = () => {

    // const { emit } = useEventEmitter();
    // const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch('/api/read-excel-master-additional-product');
        const result = await response.json();

        eventEmitter.emit('AdditionalProduct', result);

        sessionStorage.setItem('AdditionalProduct', 'YES');
        // setData(result);
    };

    fetchData();
}

const PlatformMasterData = () => {

    // const { emit } = useEventEmitter();
    // const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await fetch('/api/read-excel-master-platform');
        const result = await response.json();

        eventEmitter.emit('Platform', result);

        // console.log('PlatformMasterData ', result)
        sessionStorage.setItem('Platform', 'YES');
        // setData(result);
    };

    fetchData();
}

const Content = ({ menuKey }) => {

    // if (typeof window !== 'undefined' && !sessionStorage.getItem('MainProduct')) {
        MainProductMasterData()
    // }

    // if (typeof window !== 'undefined' && !sessionStorage.getItem('AdditionalProduct')) {
        AdditionalProductMasterData()
    // }

    // if (typeof window !== 'undefined' && !sessionStorage.getItem('Platform')) {
        PlatformMasterData()
    // }

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