# tendenz

Tendenz is an application designed to analyze and present statistical significance in financial instruments. It leverages advanced algorithms to identify trends and shifts in the financial market.

## Dev environment

```sh
fly proxy 5432 -a tendenz-db
```

Environment:

```env
DATABASE_URL="postgres://{username}:{password}@localhost:5432/tendenz_server?connection_limit=5"
```

- `/tendenz_server` specifies the database of the backend server
- `connection_limit=5` fixes an issues with high CPU count machines. The default setting sometimes opens more connections then postgres can handle.

```sh
npx prisma generate
```
