import React from 'react';

const styleTr = (key) => {
    if (key === 'seq' || key === 'id') {
        return ('text-center');
    } else if (key.toLowerCase().includes('price')) {
        return ('text-right')
    } else {
        return ('text-left');
    }
}

const Table = ({ header, data }) => {
    return (
        <table style={{ width: '100%' }}>
            <thead>
                <tr>
                    {header.map((item, index) => (
                        <th key={index} className='text-center' style={{ width: `${item.style}` }}>{item.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {Object.keys(row).map((key, i) => (
                            <td key={i} className={styleTr(key)}>{row[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table >
    );
};

export default Table;
