import { Types } from "mongoose";

export const users = [
    {
        _id: new Types.ObjectId(),
        username: "JohnWick",
        password: "johnwick",
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
    },
    {
        _id: new Types.ObjectId(),
        username: "JohnnyBravo",
        password: "johnnybravo",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Dexter",
        password: "dexterslab",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "HankHill",
        password: "hankhill",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Pim",
        password: "pimpassword",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Meatwad",
        password: "meatwadpassword",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Batman",
        password: "batmanpassword",
        tasks: [] as Record<string, unknown>[]
    },
    {
        _id: new Types.ObjectId(),
        username: "Superman",
        password: "superman",
        tasks: [] as Record<string, unknown>[]
    }
];

export default users;
