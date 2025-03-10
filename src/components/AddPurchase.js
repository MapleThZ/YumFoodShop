import React, { useState, useEffect } from 'react';
import eventEmitter from './utils/EventEmitter';

const AddPurchase = () => {

    useEffect(() => {
        const handleEvent = (data) => {
            console.log('Received event:', data);
        };

        eventEmitter.on('Platform', handleEvent);
        eventEmitter.on('MainProduct', handleEvent);
        eventEmitter.on('AdditionalProduct', handleEvent);

        return () => {
            eventEmitter.off('Platform', handleEvent);
            eventEmitter.off('MainProduct', handleEvent);
            eventEmitter.off('AdditionalProduct', handleEvent);
        };
    }, []);

    return (
        <div>
            <div className='grid grid-rows justify-items-center'>
                <h1 className='header-context'>เพิ่มรายการคำสั่งซื้อประจำวัน</h1>
            </div>
            <div className='grid grid-rows justify-items-center'>
            </div>
        </div>
    );
}

export default AddPurchase;