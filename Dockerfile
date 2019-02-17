FROM node
WORKDIR /usr/src/app
COPY . .
RUN npm i --unsafe-perm
EXPOSE 3000
CMD npm start