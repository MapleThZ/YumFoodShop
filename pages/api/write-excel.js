import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'POST') {

        const body = req.body;

        const data = body.data
        const pathFile = body.pathFile
        const fileName = body.fileName

        // Create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Define the path to save the Excel file
        const filePath = path.resolve('.', pathFile, fileName);

        // Write the Excel file to the specified path
        XLSX.writeFile(workbook, filePath);

        res.status(200).json({ code: '200', message: 'Excel file written successfully', filePath });
    } else {
        res.status(500).json({ code: '500', message: 'Method not allowed' });
    }
}