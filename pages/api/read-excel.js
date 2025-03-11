// pages/api/read-excel.js
import { readFileSync } from 'fs';
import * as XLSX from 'xlsx';
import path from 'path';

export default function handler(req, res) {
  const { month, year } = getCurrentMonthAndYear();
  const filePath = path.resolve('./public/excel', year + '-' + month + '-PurchaseList.xlsx');
  const fileBuffer = readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  res.status(200).json(jsonData);
}

const getCurrentMonthAndYear = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // getMonth() returns month from 0 to 11
  const year = currentDate.getFullYear();
  return { month, year };
};
