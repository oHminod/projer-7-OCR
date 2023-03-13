# Groupomania - Réseau social

La direction a promis des mesures d’amélioration de la communication entre collègues, notamment la mise en place d’un nouvel outil numérique. Il s’agit de la création d’un réseau social interne moderne, qui permettra aux employés de se connaître dans un cadre plus informel.

## Installation et mise en route

Après avoir récupéré le code source du projet, aller dans le dossier `front-react` avec un terminal et exécuter la commande `npm install`, répéter l'opération pour le backend en tapant la commande `npm install` depuis la racine du dossier `server`.

Ceci fait, déplacer le fichier `env-server` à la racine du dossier `server` et renommer le fichier `env-server` en `.env`.

> Le fichier env-server se trouve avec les dumps de la base de données, dans l'archive des livrables pour l'évaluation du projet 7, sur la plateforme OpenClassRooms.
> Attention à ne pas ajouter d'extension au fichier. Une fois à la racine du dossier `server`, prendre garde à ce que le fichier se nomme juste `.env` et non `.env.txt` par exemple.

### Démarrage

Pour démarrer le projet, commencer par aller dans le dossier `server` avec le terminal et lancer la commande `npm start`.

```bash
groupomania/server % npm start

> server@1.0.0 start
> nodemon server

[nodemon] 2.0.20
[nodemon] to restart at any time, enter \`rs\`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting \`node server.js\`
Listening on port 36600
groupomania app listening on port 36600
http://localhost:36600
Connexion à MongoDB réussie !
```

Ceci indique que l'API fonctionne normalement.

Maintenant, aller dans le dossier `front-react` et lancer également la commande `npm start`.

```bash
Compiled successfully!

You can now view front-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://<votreIP>:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Sur la même machine, vous pouvez vous rendre à l'adresse localhost dans votre navigateur.

### Compte administrateur

Pour se connecter au compte administrateur, utiliser l'adresse email `admin@groupomania.com` et le mot de passe `admin`.
Le compte administrateur peut modifier et supprimer tous les posts.

### Demo




https://user-images.githubusercontent.com/85355838/224209767-5ed7e0ab-bdaf-48f5-8a57-2e4734ccfaf0.mov





## Spécifications fonctionnelles demandées

### Page de connexion

Une page de connexion permettant à l’utilisateur de se connecter, ou bien de créer un compte s’il n’en possède pas. Ici il faut demander le minimum d’informations, la connexion doit se faire à partir de deux éléments : le mail de l’employé, et un mot de passe. Rien de plus à prévoir pour le moment.

### Détails de la fonctionnalité de connexion

-   Un utilisateur doit avoir la possibilité de se déconnecter.
-   La session de l’utilisateur persiste pendant qu’il est connecté.
-   Les données de connexion doivent être sécurisées.

### Page d’accueil

La page d’accueil doit lister les posts créés par les différents utilisateurs. On voudra que les posts soient listés de façon antéchronologique (du plus récent au plus ancien).

### Création d’un post

-   Un utilisateur doit pouvoir créer un post.
-   Un post doit pouvoir contenir du texte et une image.
-   Un utilisateur doit aussi pouvoir modifier et supprimer ses posts.

### Système de like

Un utilisateur doit pouvoir liker un post, une seule fois pour chaque post.

### Rôle administrateur

Dans le but de pouvoir faire de la modération si nécessaire, il faudra créer un utilisateur “administrateur” ; celui-ci aura les droits de modification / suppression sur tous les posts du réseau social. Il faudra donc nous communiquer les identifiants de cet administrateur.

### Identité graphique

Police d’écriture : tous les textes du site doivent utiliser la police Lato. Couleurs : vous êtes libre sur les couleurs, mais voici notre palette actuelle dont vous pouvez vous inspirer.

-   Primaire : #FD2D01
-   Secondaire : #FFD7D7
-   Tertiaire : #4E5166
