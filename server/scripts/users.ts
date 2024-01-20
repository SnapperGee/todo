import { Types } from "mongoose";

export const users = [
    {
        _id: new Types.ObjectId(),
        username: "JohnWick",
        password: "johnwickpassword"
    },
    {
        _id: new Types.ObjectId(),
        username: "HarryPotter",
        password: "harrypotter"
    },
    {
        _id: new Types.ObjectId(),
        username: "Neo",
        password: "neopassword"
    },
    {
        _id: new Types.ObjectId(),
        username: "Simba",
        password: "simbapassword"
    },
    {
        _id: new Types.ObjectId(),
        username: "Kion",
        password: "kionpassword"
    },
    {
        _id: new Types.ObjectId(),
        username: "RogerSmith",
        password: "rogersmith"
    }
];

export default users;
