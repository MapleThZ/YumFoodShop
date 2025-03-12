import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'POST') {

        const { month, year } = getCurrentMonthAndYear();

        const data = req.body;

        // Create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Define the path to save the Excel file
        const filePath = path.resolve('.', './public/excel', year + '-' + month + '-PurchaseList.xlsx');

        // Write the Excel file to the specified path
        XLSX.writeFile(workbook, filePath);

        res.status(200).json({ code: '200', message: 'Excel file written successfully', filePath });
    } else {
        res.status(500).json({ code: '500', message: 'Method not allowed' });
    }
}

const getCurrentMonthAndYear = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = currentDate.getFullYear();
    return { month, year };
};
