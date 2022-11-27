import fs from "fs";

type Person = {
  firstname: string;
  lastname: string;
};

type WhitelistSaver = {
  saveToWhitelist(person: Person): void;
};

const FILE = "whitelist.txt";

function PersonFactory(firstname: string, lastname: string): Person {
  return {
    firstname,
    lastname,
  };
}

function WhitelistFactory(): WhitelistSaver {
  return {
    saveToWhitelist: ({ firstname, lastname }: Person) => {
      fs.appendFileSync(FILE, `${firstname} ${lastname}\n`);
    },
  };
}

const person1 = PersonFactory("Gon", "Freecs");
const person2 = PersonFactory("Kirua", "Zoldyck");

const whitelist = WhitelistFactory();

whitelist.saveToWhitelist(person1);
whitelist.saveToWhitelist(person2);
