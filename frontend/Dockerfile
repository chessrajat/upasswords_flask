FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app/frontend/
COPY package*.json /app/frontend/
RUN npm install
COPY . /app/frontend/
EXPOSE 3000
RUN chown -R node /app/frontend/
USER node
CMD ["npm", "start"]
