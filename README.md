# Tendenz

This project aims to assist you in staying informed about financial markets by utilizing the [z-score](https://tendenz.vercel.app/docs/statistical-significants) to assess the significance of price movements relative to an asset's historical patterns. By applying this methodology across an entire market (currently focusing on US equities), we can rapidly identify assets undergoing highly unusual events.

For those without the time budget for manual research and lacking interesting in the opinions of journalists: Gain a traders' market insight in 5 minutes on [tendenz](https://tendenz.vercel.app).

This gets even more interesting ones we extend our method to more obscure assets which typically get very little 'main stream' coverage. Japanese rice futures collapse? Credit default swaps of a brazilian bank shot up?

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
