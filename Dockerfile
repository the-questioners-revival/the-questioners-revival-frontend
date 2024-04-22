# pull official base image
FROM node:14.16.0

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i

# add app
COPY . .
RUN npm run build

# start app
EXPOSE 3001
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3001"]