FROM node:12.13.1

ARG WORK_DIR=/usr/src/movie-api
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm install

COPY . ${WORK_DIR}

RUN npm run build

CMD npm start
