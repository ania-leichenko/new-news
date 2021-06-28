let db = require("diskdb");
db.connect(`./data`, ["users", "news"]);

export default db;
