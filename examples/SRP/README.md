Une classe ne devrait jamais avoir plus d'une seule raison de changer ni plus d'une seule responsabilité.

Le Principe de responsabilité unique ("Single responsibility Principle") est le premier principe SOLID dont j'ai entendu parler dans ma carrière de développeur.

En quoi consiste-t-il vraiment ?

Reprenons l'analogie de son auteur, Robert C. Martin, avec l'exemple de la voiture:

Imaginons un automobiliste qui emmènerait sa voiture chez le garagiste parce que le bouton qui sert à ouvrir et fermer les fenêtres est défectueux.

Au moment où il récupère sa voiture, le bouton fonctionne de nouveau correctement, mais la voiture ne démarre plus.

Embêtant, non ?

Pourtant, bon nombre d'entre nous ont déjà vécu cette situation à travers notre code.

Cela se produit car les responsabilités sont mélangées dans les classes/fonctions.

Comment éviter cela ?

Il est difficile de trouver un exemple parlant mais je vais m'y risquer.

Dans cet exemple, vous allez voir que les responsabilités seront confondues.
Premièrement, nous écrivons une classe `Person` qui modélise l'identité d'une personne (nom et prénom), et une fonction pour noter le nom complet dans une liste blanche.

```
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
```

Ce code fonctionne correctement mais deux responsabilités s'entremêles, celle de modéliser l'identité d'une personne et celle d'écrire le nom d'une personne dans une liste blanche.
Réecrivons le code selon le principe de responabilité unique :
```
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
``` 

Les deux responsabilités ( à savoir la modélisation de l'identité de la personne et noter le nom complet de la personne dans une liste blanche ) sont séparées dans deux entitées différentes.
