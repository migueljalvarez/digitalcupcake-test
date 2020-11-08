FROM node:12.18.3-alpine
WORKDIR /usr/src/app
COPY ./ ${WORKDIR}
RUN yarn install
EXPOSE 3000
CMD yarn run dev
