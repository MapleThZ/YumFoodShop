import React, { useState, useEffect } from 'react';

const SessionStorageComponent = () => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const storedValue = sessionStorage.getItem('myValue');
        if (storedValue) {
            setValue(storedValue);
        }
    }, []);

    const handleSetValue = () => {
        sessionStorage.setItem('myValue', value);
    };

    const handleClearValue = () => {
        sessionStorage.removeItem('myValue');
        setValue('');
    };

    return (
        <div>
            <h1>Session Storage Example</h1>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter a value"
            />
            <button onClick={handleSetValue}>Set Value</button>
            <button onClick={handleClearValue}>Clear Value</button>
            <p>Stored Value: {sessionStorage.getItem('myValue')}</p>
        </div>
    );
};

export default SessionStorageComponent;
