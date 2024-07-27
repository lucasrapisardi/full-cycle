FROM nginx:1.15-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN mkdir /usr/src/app -p && touch /usr/src/app/index.js

# ENTRYPOINT [ "/docker-entrypoint.sh" ]
# CMD [ "nginx", "-g", "daemmon off;" ]