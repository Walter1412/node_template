FROM node:15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

ADD . .
RUN npm install
RUN npm run build
RUN npm run start
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source


EXPOSE 5000
CMD [ "node", "app.js" ]
