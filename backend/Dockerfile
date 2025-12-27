# ---------- BUILD STAGE ----------
FROM node:18-alpine AS build

WORKDIR /app

# dependencies
COPY package*.json ./
RUN npm install

# source code
COPY . .

# TypeScript → JavaScript
RUN npm run build


# ---------- RUNTIME STAGE ----------
FROM node:18-alpine

WORKDIR /app

# non-root user
RUN adduser -D robot

# copy only required things
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# install only production dependencies
RUN npm install --only=production



USER robot

EXPOSE 9000

CMD ["node", "dist/server.js"]
