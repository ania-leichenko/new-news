let db = require("diskdb");
db.connect(`./data`, ["users"]);

export default db;
