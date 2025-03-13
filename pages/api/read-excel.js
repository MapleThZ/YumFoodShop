// pages/api/read-excel.js
import { readFileSync } from 'fs';
import * as XLSX from 'xlsx';
import path from 'path';
import { getCurrentDayMonthAndYear } from '../../src/components/utils/Date'

export default function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const body = req.body;
      const pathFile = body.pathFile
      const fileName = body.fileName

      const filePath = path.resolve(pathFile, fileName);
      const fileBuffer = readFileSync(filePath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      res.status(200).json(jsonData);
    } else {
      const { day, month, year } = getCurrentDayMonthAndYear();
      const filePath = path.resolve('./public/excel', year + '' + (month < 10 ? '0' + month : month) + '' + (day < 10 ? '0' + day : day) + '-PurchaseList.xlsx');
      const fileBuffer = readFileSync(filePath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      res.status(200).json(jsonData);
    }
  } catch (error) {
    res.status(200).json([]);
  }
}