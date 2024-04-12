FROM node:20.1-alpine as build

WORKDIR /app

COPY package.json ./
RUN npm install --loglevel verbose
COPY . .
RUN npm run build -- --output-path=./dist/out --configuration production

FROM nginx:alpine

COPY --from=build /app/dist/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
