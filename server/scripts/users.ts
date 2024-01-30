import { ITask } from "./tasks.js";
import { Types } from "mongoose";

interface IUser
{
    _id: Types.ObjectId;
    username: string;
    password: string;
    tasks: ITask[];
}

export const users: IUser[] = [
    {
        _id: new Types.ObjectId(),
        username: "JohnWick",
        password: "johnwick",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "HarryPotter",
        password: "harrypotter",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Neo",
        password: "neopassword",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Simba",
        password: "simbapassword",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Kion",
        password: "kionpassword",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "RogerSmith",
        password: "rogersmith",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "JohnnyBravo",
        password: "johnnybravo",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Dexter",
        password: "dexterpassword",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "HankHill",
        password: "hankhill",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Pim",
        password: "pimpassword",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Meatwad",
        password: "meatwadpassword",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Batman",
        password: "batmanpassword",
        tasks: []
    },
    {
        _id: new Types.ObjectId(),
        username: "Superman",
        password: "superman",
        tasks: []
    }
];

export default users;
