ARG NODE_VERSION=20.14.0
ARG NODE_ENV=production
ARG NODE_PORT=3000

FROM node:${NODE_VERSION}

ENV NODE_ENV $NODE_ENV
ENV PORT $NODE_PORT

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app/
COPY . /usr/src/nuxt-app/

RUN npm install
RUN npm run build

RUN npx nuxi build

EXPOSE 3000

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

#CMD [ "npx", "nuxi", "start" ]
CMD ["node", ".output/server/index.mjs" ]