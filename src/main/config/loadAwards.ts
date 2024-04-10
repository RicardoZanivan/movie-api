const db = require("./db");

function loadAwards() {
    db.each("SELECT * FROM migration", function(err, row) {
        console.log("User id : " + row.year, row.title);
    });
}

export { loadAwards }; // Remova os parênteses