import { app } from "./server.js";
import db from "./connection.js";

db.once("open", () => {
    if (process.env.NODE_ENV === "development")
    {
        app.listen(process.env.PORT, () =>
        {
            console.log(`Express server listening on http://127.0.0.1:${process.env.PORT}`);
        });
    }
    else
    {
        app.listen(process.env.PORT);
    }
});
