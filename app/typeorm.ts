import "reflect-metadata";
import {createConnection} from "typeorm";
import { Member } from "./entity/Member";

createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new Member();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    console.log("Loading members from the database...");
    const members = await Member.find();
    console.log("Loaded members: ", members);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
