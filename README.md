COMMENT FAIRE FONCTIONNER LE SITE ?

Installation
Avant toute chose, vérifiez que NodeJS 16.14 soit installé sur votre ordinateur puis clonez le projet.

Le projet est construit sur 2 fichier essentiel "Back-end et Front-end"

BACK-END

1- Aller sur le fichier back-end depuis le terminal est faite la commande "npm install"

2- Dans le dossier back-end créer un fichier .env et ajouter :

-MONGO_URI = 'mongodb+srv://teddy:teddy76@opcproject.wkopffr.mongodb.net/?retryWrites=true&w=majority'

-TOKEN = "RANDOM_TOKEN_SECRET"

-PORT:"8080"

3- Une fois le fichier .env créer, démarrer le serveur back-end depuis le terminal,toujours depuis le fichier back-end avec la commande "nodemon server"

Le serveur devrait ce lancer sur le PORT 8080

FRONT-END

1- Aller sur le fichier front-end depuis le terminal désormais est faite la commande "npm install" encore une fois

2- Une fois tout installé il ne vous reste plus qu'à lancer le front-end toujours depuis le serveur avec la commande "npm start"

3- L'application front-end s'ouvrira donc sur votre navigateur sur le port 3000 (il est nécessaire d'être sur le port 3000 et pas un autre)



Bonne navigation !
