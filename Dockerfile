# Stage 1
FROM node:14.18.2 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --configuration --prod

# Stage 2

FROM nginx

COPY --from=build-step /app/dist/hellena /usr/share/nginx/html

# heroku specific
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
