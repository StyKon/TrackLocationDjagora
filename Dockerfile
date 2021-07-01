# stage 1
FROM node:latest as builder
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
CMD ["npm", "start"]
#FROM nginx:alpine
#COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
#COPY --from=builder usr/dist/angularcarlocation usr/share/iginx/html
