import { Types } from "mongoose";

export const users = [
    {
        _id: new Types.ObjectId(),
        username: "JohnWick",
        password: "johnwickpassword",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "HarryPotter",
        password: "harrypotter",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Neo",
        password: "neopassword",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Simba",
        password: "simbapassword",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Kion",
        password: "kionpassword",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "RogerSmith",
        password: "rogersmith",
        tasks: [] as Record<string, unknown>[]
    }
];

export default users;
