# Projet DAB API

Ce projet est une API de Distributeur Automatique de Billets (DAB) développée avec NestJS. L'API permet de simuler les opérations courantes d'un DAB.
## Prérequis

- Node.js (version 14 ou supérieure)
- MySQL (version 5.7 ou supérieure)
- NestJS CLI (installé globalement) : `npm install -g @nestjs/cli`

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   npm install

## Configuration de la base de données

1. Installez WAMP ou MAMP selon votre OS, puis connectez vous à l'adresse : 

http://localhost/phpmyadmin/index.php?route=/server/sql

Connectez vous avec vos identifiants (par défaut Utilisateur : root et Mot de passe : (laissez vide))
Une fois connecté, créez une nouvelle base nommée "platinium_bank"
Créez ensuite un nouvel utilisateur nommé "5iw-nest" et avec comme mot de passe "5iw-nest".

Si vous souhaitez choisir vous même le nom de la base, de l'utilisateur ainsi que son mot de passe, vous devrez en plus de cela changer dans le fichier "src/database/database.provider.ts" les paramètres nommés :
  username: '5iw-nest',
  password: '5iw-nest',
  database: 'platinium_bank',

2. Insertion du jeu de données
   
  ```SQL
  -- Création de la base de données
CREATE DATABASE IF NOT EXISTS platinium_bank;
USE platinium_bank;

-- Création de la table User
CREATE TABLE IF NOT EXISTS `Users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Création de la table Account
CREATE TABLE IF NOT EXISTS `Accounts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('courant', 'pro', 'livretA', 'commun') NOT NULL,
  `balance` FLOAT NOT NULL DEFAULT 0.0,
  `userId` INT NOT NULL,
  `secondUserId` INT DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `Users`(`id`),
  FOREIGN KEY (`secondUserId`) REFERENCES `Users`(`id`) ON DELETE SET NULL
);

-- Création de la table CreditCard
CREATE TABLE IF NOT EXISTS `CreditCards` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cardNumber` VARCHAR(16) NOT NULL UNIQUE,
  `expirationDate` VARCHAR(5) NOT NULL, -- Format MM/YY
  `cvv` VARCHAR(3) NOT NULL,
  `pin` VARCHAR(4) NOT NULL,
  `accountId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`accountId`) REFERENCES `Accounts`(`id`)
);

-- Création de la table Transaction
CREATE TABLE IF NOT EXISTS `Transactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('withdraw', 'deposit', 'transfer') NOT NULL,
  `amount` FLOAT NOT NULL,
  `date` DATETIME NOT NULL,
  `fromAccountId` INT DEFAULT NULL,
  `toAccountId` INT DEFAULT NULL,
  `accountId` INT DEFAULT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`fromAccountId`) REFERENCES `Accounts`(`id`),
  FOREIGN KEY (`toAccountId`) REFERENCES `Accounts`(`id`),
  FOREIGN KEY (`accountId`) REFERENCES `Accounts`(`id`)
);

-- Insertion des utilisateurs
INSERT INTO `Users` (`firstName`, `lastName`, `email`, `password`)
VALUES
('John', 'Doe', 'john.doe@example.com', 'password123'),
('Jane', 'Doe', 'jane.doe@example.com', 'password123');

-- Insertion des comptes
INSERT INTO `Accounts` (`type`, `balance`, `userId`, `secondUserId`)
VALUES
('courant', 1000.0, 1, NULL), -- Compte courant pour John Doe
('pro', 5000.0, 1, NULL), -- Compte pro pour John Doe
('livretA', 300.0, 2, NULL); -- Compte livret A pour Jane Doe

-- Insertion des cartes bleues
INSERT INTO `CreditCards` (`cardNumber`, `expirationDate`, `cvv`, `pin`, `accountId`)
VALUES
('1234567812345678', '12/25', '123', '1111', 1), -- Carte pour le compte courant de John Doe
('8765432187654321', '01/26', '456', '2222', 2); -- Carte pour le compte pro de John Doe

```


** A chaque fois que l'on relance l'API, il faut insérer de nouveau le jeu de données**

## Lancement et utilisation de l'API

Démarrez l'application avec : 

```bash
npm run start
```

**Utilisation des routes**

1. Connexion
  ```
  Méthode : POST

    URL : http://localhost:3000/dab/login

    Corps de la requête (json) :
    {
    "cardNumber": "1234567812345678",
    "pin": "1111"
    }
   ```

    
2. Déconnexion
  ```
  Méthode : POST
  URL : http://localhost:3000/dab/logout
  En-tête : Authorization: Bearer your_jwt_token_here
  ```
    
3. Virement interne
  ```
Méthode : POST

URL : http://localhost:3000/dab/account/transfer

En-tête : Authorization: Bearer your_jwt_token_here

Corps de la requête :
{
  "fromAccountId": 1,
  "toAccountId": 2,
  "amount": 100
}
```
4. Dépôt de chèque
```
Méthode : POST

URL : http://localhost:3000/dab/account/deposit

En-tête : Authorization: Bearer your_jwt_token_here

Corps de la requête :

{
  "accountId": 1,
  "amount": 200,
  "delay": 5000
}
```
5. Consultation du solde des comptes
```
Méthode : GET
URL : http://localhost:3000/dab/accounts/balance
En-tête : Authorization: Bearer your_jwt_token_here
```
6. Consultation des transactions d'un compte
```
Méthode : GET
URL : http://localhost:3000/dab/accounts/:accountId/transactions
En-tête : Authorization: Bearer your_jwt_token_here
```
7. Retrait d'argent
```
Méthode : POST

URL : http://localhost:3000/dab/accounts/:accountId/withdraw

En-tête : Authorization: Bearer your_jwt_token_here

Corps de la requête :

{
  "amount": 100
}
Remplacez :accountId par l'identifiant du compte que vous souhaitez utiliser pour les requêtes.
```

**Remarques**

Toutes les routes protégées nécessitent un token JWT valide dans l'en-tête Authorization.
Le token JWT est obtenu après une connexion réussie via la route /dab/login.


