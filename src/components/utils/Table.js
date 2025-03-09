import React from 'react';

const Table = ({ header, data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {header.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table >
    );
};

export default Table;
