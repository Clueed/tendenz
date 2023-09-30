# `@tendenz/db`

- Currently only used for local development environments because production is hosted on Fly Postgres, which is semi-managed.
- It also serves as a backup in case a migration from fly.io is ever necessary.

## ⚠️ Postgres is setup here to not require passwords ⚠️

- This is done allow for seemless substitution of `fly proxy`. Ignoring the passwords means not having to change `DATABASE_URL` in any application.
- Besides there is no sensitive data here.
- Still, make sure you don't make it accessible on untrusted networks or enable passwords by removing `POSTGRES_HOST_AUTH_METHOD=TRUST` and settings `POSTGRES_PASSWORD={password}` in `docker-compose.yml`.

## Run DB locally

```sh
docker compose up
```

```sh
DATABASE_URL="postgres://postgres@localhost:5432/tendenz_server"
```

### Dump production

```sh
fly proxy 5432 -a tendenz-db

pg_dumpall -U postgres -h localhost -p 5432 --clean --file=dump.sql
```

### Restore from previous dumb

```sh
docker exec -i db-postgres-1 psql -U tendenz_server -d tendenz_server < ./dump.sql
```
