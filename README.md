# Groupomania - Réseau social
La direction a promis des mesures d’amélioration de la communication entre collègues, notamment la mise en place d’un nouvel outil numérique. Il s’agit de la création d’un réseau social interne moderne, qui permettra aux employés de se connaître dans un cadre plus informel.

## Installation et mise en route
Après avoir récupéré le code source du projet, aller dans le dossier `front-react` avec un terminal et utiliser la commande `npm install`, répéter l'opération dans le dossier `server` 

```bash
cd ../server
npm install
```
Ceci fait, copier le fichier `env-front-react` dans le dossier `front-react` et le renommer `.env`. De même, copier le fichier `env-server` dans le dossier `server` et le renommer `.env` également.
> Les fichiers env-front-react et env-server se trouvent dans l'archive des livrables pour l'évaluation du projet 7 sur la plateforme OpenClassRooms.

### Démarrage
Pour démarrer le projet, commencer par aller dans le dossier server avec le terminal et lancer la commande `npm start`. 

```
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
Maintenant aller dans le dossier front-react et lancer également la commande `npm start`.

```
Compiled successfully!

You can now view front-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.68.59:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```
Sur la même machine, vous pouvez vous rendre à l'adresse localhost dans votre navigateur.

### Compte administrateur
Pour se connecter au compte administrateur, utiliser l'adresse email `admin@groupomania.com` et le mot de passe `admin`.
Le compte administrateur peut modifier et supprimer tous les posts.

## Spécifications fonctionnelles

### Page de connexion
Une page de connexion permettant à l’utilisateur de se connecter, ou bien de créer un compte s’il n’en possède pas. Ici il faut demander le minimum d’informations, la connexion doit se faire à partir de deux éléments : le mail de l’employé, et un mot de passe. Rien de plus à prévoir pour le moment.

### Détails de la fonctionnalité de connexion
* Un utilisateur doit avoir la possibilité de se déconnecter.
* La session de l’utilisateur persiste pendant qu’il est connecté.
* Les données de connexion doivent être sécurisées.

### Page d’accueil
La page d’accueil doit lister les posts créés par les différents utilisateurs. On voudra que les posts soient listés de façon antéchronologique (du plus récent au plus ancien).

### Création d’un post
* Un utilisateur doit pouvoir créer un post.
* Un post doit pouvoir contenir du texte et une image.
* Un utilisateur doit aussi pouvoir modifier et supprimer ses posts.

### Système de like
Un utilisateur doit pouvoir liker un post, une seule fois pour chaque post.

### Rôle administrateur
Dans le but de pouvoir faire de la modération si nécessaire, il faudra créer un utilisateur “administrateur” ; celui-ci aura les droits de modification / suppression sur tous les posts du réseau social. Il faudra donc nous communiquer les identifiants de cet administrateur.

