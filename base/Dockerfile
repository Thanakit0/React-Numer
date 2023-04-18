FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD = 1234
ENV MYSQL_DATABASE database

COPY ./database_rootofequation.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
