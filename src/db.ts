let db = require("diskdb");
db.connect(`./data`, ["users", "news", "comments"]);

export default db;
