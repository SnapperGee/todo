import { app } from "./server.js";
import "dotenv/config";

if (process.env.NODE_ENV === "development")
{
    app.listen(process.env.PORT, () =>
    {
        console.log(`Express server listening on http://localhost:${process.env.PORT}`);
    });
}
else
{
    app.listen(process.env.PORT);
}
