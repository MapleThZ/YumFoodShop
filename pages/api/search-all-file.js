import fs from 'fs';
import path from 'path'

const dateRegex = /\b(\d{4})(\d{2})(\d{2})\b/;

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const body = req.body;
            const fileList = await searchFiles(body.pathFile, body.startDate, body.endDate, body.typeFile)
            res.status(200).json(fileList);
        }
    } catch (error) {
        res.status(200).json([]);
    }
}

async function searchFiles(dir, startDate, endDate, typeFile) {
    const directoryPath = path.join(process.cwd(), dir);
    const files = fs.readdirSync(directoryPath);
    await files.filter(file => {
        if (typeFile.includes(file)) {
            return true
        }
        return false;
    })
    const fileList = filterFilesByDate(files, startDate, endDate, typeFile);
    return files;
}

function filterFilesByDate(files, startDate, endDate, typeFile) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return files.filter(file => {
        const match = file.match(dateRegex);
        if (match && typeFile.includes(file)) {
            const fileDate = new Date(`${match[1]}-${match[2]}-${match[3]}`);
            return fileDate >= start && fileDate <= end;
        }
        return false;
    });
}