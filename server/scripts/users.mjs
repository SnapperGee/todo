import { Types } from "mongoose";

export const users = Object.freeze([
    Object.freeze({
        id: new Types.ObjectId(),
        name: "John Wick",
        password: "johnwickpassword"
    }),
    Object.freeze({
        id: new Types.ObjectId(),
        name: "Harry Potter",
        password: "harrypotter"
    }),
    Object.freeze({
        id: new Types.ObjectId(),
        name: "Neo",
        password: "neopassword"
    }),
    Object.freeze({
        id: new Types.ObjectId(),
        name: "Simba",
        password: "simbapassword"
    }),
    Object.freeze({
        id: new Types.ObjectId(),
        name: "Kion",
        password: "kionpassword"
    }),
    Object.freeze({
        id: new Types.ObjectId(),
        name: "Roger Smith",
        password: "rogersmith"
    })
]);

export default users;
