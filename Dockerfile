FROM node:24

EXPOSE 8080

WORKDIR /src

COPY . .

# example from docs: RUN yarn install --production
RUN npm install

CMD ["node", "index.js"]