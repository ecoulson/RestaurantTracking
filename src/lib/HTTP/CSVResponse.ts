export default class CSVResponse {
    public build(entries : Object[]) {
        if (entries.length === 0) {
            return "";
        }
        let csv = [];
        let row = [];
        const keys = Object.keys(entries[0]).sort();
        for (let key of keys) {
            row.push(`"${key}"`);
        }
        csv.push(row.join(","));
        for (let checkIn of entries) {
            row = [];
            for (let key of keys) {
                row.push(`"${checkIn[key]}"`);
            }
            csv.push(row.join(","));
        }
        return csv.join("\n");
    }
}