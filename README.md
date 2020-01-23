# Orta API

An API for Orta things.

## Dev Setup

Set the following environment variables

```
export OA_PG_USER=user
export OA_PG_PASS=password
export OA_PG_HOST=localhost
export OA_PG_PORT=5432
export OA_DB_NAME=dbname
```

It may be useful to add them to your login shell profile file,
such as `~/.profile`


Start postgres

```
docker container run \
--name container-name \
-e POSTGRES_USER=$OA_PG_USER \
-e POSTGRES_PASSWORD=$OA_PG_PASS \
-p $OA_PG_PORT:$OA_PG_PORT
-d postgres
```
