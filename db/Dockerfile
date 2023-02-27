FROM mongo

CMD mongod --fork --logpath /var/log/mongodb.log; \
    mongorestore --db upasswords /app/backup/upasswords; \
    mongod --shutdown; \
    docker-entrypoint.sh mongod