import React, { useState, useEffect } from 'react';
import PurchaseList from './PurchaseList';

const Content = () => {
    const [activeSubIndex, setActiveSubIndex] = useState(null);


    useEffect(() => {

        var keyComponent = '';
        const menuKey: any = sessionStorage.getItem('menu');
        if (menuKey) {
            keyComponent = menuKey;
        }

        const submenyKey: any = sessionStorage.getItem('menuIndex');
        if (submenyKey) {
            keyComponent += submenyKey;
        }


        console.log('keyComponent ', keyComponent)
    }, []);

    return (
        <div>
            <PurchaseList />
        </div>
    );
}

export default Content;