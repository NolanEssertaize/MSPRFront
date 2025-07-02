# Utilise une image de base Node.js
FROM node:20

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de package et installe les dépendances
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copie le reste du projet
COPY . .

# Définit le port que le conteneur va écouter
EXPOSE 5000

# Commande de lancement
CMD ["yarn", "dev"]


ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn build