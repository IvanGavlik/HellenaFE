# Stage 1 build
FROM node:12.20.0 as build-step

WORKDIR /app

COPY ["package.json", "./"]
RUN npm install

COPY . .
RUN npm run build

# Stage 2 run
FROM nginx:latest
COPY --from=build-step /app/dist/hellena /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
