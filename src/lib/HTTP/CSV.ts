export default class CSV {
    public static JSONtoCSV(entries : Object[]) {
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
        for (let entry of entries) {
            row = [];
            for (let key of keys) {
                row.push(`"${(entry as any)[key]}"`);
            }
            csv.push(row.join(","));
        }
        return csv.join("\n");
    } 
}