import fs from "fs";

type Person = {
  firstname: string;
  lastname: string;

  saveToWhitelist(): void;
};

const FILE = "whitelist.txt";

function PersonFactory(firstname: string, lastname: string): Person {
  return {
    firstname,
    lastname,
    saveToWhitelist: () => {
      fs.appendFileSync(FILE, `${firstname} ${lastname}\n`);
    },
  };
}

const person1 = PersonFactory("Gon", "Freecs");
const person2 = PersonFactory("Kirua", "Zoldyck");

person1.saveToWhitelist();
person2.saveToWhitelist();
