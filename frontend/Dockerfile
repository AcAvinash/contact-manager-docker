FROM node:18-alpine AS build
WORKDIR /app

# Add build tools for Alpine
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci  # clean install
COPY . .

 ENV REACT_APP_EXPRESS_SERVER_URL="/api"

RUN  npm run build
   # React build folder will be created

FROM nginx:1.25.3-alpine
WORKDIR /app
ENV REACT_APP_EXPRESS_SERVER_URL="/api"
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

