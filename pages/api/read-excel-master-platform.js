// pages/api/read-excel.js
import { readFileSync } from 'fs';
import * as XLSX from 'xlsx';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('./public/excel', 'MasterData.xlsx');
  const fileBuffer = readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[2];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  res.status(200).json(jsonData);
}
