const fs = require('fs');
const path = require('path');
const { RAW_DATA } = require('./raw_data.js');

const DATA_FILE = path.join(__dirname, 'data', 'testimonies.json');

function parseData(rawData) {
    // Split by the start of a new record (lookahead regex)
    // This splits the string but keeps the delimiter at the start of the next chunk
    // We actually need to split such that we get array of records
    const records = rawData.split(/(?=I'd like to remain anonymous!|I don't mind sharing my name!)/g)
        .filter(r => r.trim().length > 0);

    const parsedTestimonies = records.map(record => {
        // Split by tab
        const parts = record.split('\t');

        // Basic validation - expecting at least preference, date, id
        if (parts.length < 5) {
            console.warn('Skipping malformed record:', record.substring(0, 50) + '...');
            return null;
        }

        const preference = parts[0].trim();
        const id = parts[parts.length - 1].trim();
        const dateStr = parts[parts.length - 2].trim();

        // Name Logic
        let name = "Anonymous";
        if (preference.includes("sharing my name")) {
            const firstName = parts[1] ? parts[1].trim() : "";
            const lastName = parts[2] ? parts[2].trim() : "";
            if (firstName || lastName) {
                name = `${firstName} ${lastName}`.trim();
            }
        }

        // Text Logic
        // Text starts at index 5.
        // It ends before the date (index length - 2).
        // If parts length is exactly 8 (Pref, F, L, Code, Ph, Text, Date, Id), text is at 5.
        // But let's be safe and slice.
        // Wait, index 5 is correct if we assume standard columns.
        // 0: Pref, 1: First, 2: Last, 3: Code, 4: Phone, 5...: Text
        let textParts = parts.slice(5, parts.length - 2);
        let text = textParts.join('\t').trim();

        // Clean quotes
        if (text.startsWith('"') && text.endsWith('"')) {
            text = text.slice(1, -1);
        }

        // Handle double quotes inside text might be escaped as "" in CSV but here just raw
        // The timestamp needs to be formatted nicely? It is "12/7/2025, 3:09:57 PM"
        // The existing app might expect a certain format, but strings are usually fine.

        return {
            id: id,
            name: name,
            text: text,
            timestamp: dateStr
        };
    }).filter(item => item !== null);

    return parsedTestimonies;
}

try {
    const data = parseData(RAW_DATA);

    // Ensure directory exists
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    console.log(`✅ Successfully generated ${data.length} testimonies from raw data!`);

} catch (error) {
    console.error('Error processing data:', error);
}
