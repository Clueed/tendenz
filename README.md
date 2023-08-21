![tendenz logo](https://github.com/Clueed/tendenz/assets/7318830/080c9e2e-da2e-46f2-982c-9bf4fba90300#gh-dark-mode-only)

https://tendenz.vercel.app

---


This project emerged from a personal need to stay updated about financial markets without the influence of biased viewpoints or the time-consuming nature of manual research. It aims to provide a starting point for further investigation.

This is accomplished by improving upon _the biggest winners/losers_ by considering historical volatility in combination with the most recent price movements. Specifically, Tendenz aims to rank the price movements of financial assets by their statistical significants as measured by the [z-score](https://tendenz.vercel.app/docs/statistical-significants).

By applying this methodology across an entire market, we can identify assets undergoing highly unusual events. This gets even more interesting ones we extend our method to more obscure assets which typically get very little 'main stream' coverage. Japanese rice futures collapse? Credit default swaps of a brazilian bank shot up?


Being a frist-stage MVP, which is focused---beyond the technical aspects---on UX, IU, and PMF, this is currently only done for daily returns of US equities.


For those without the time budget for manual research and lacking interesting in the opinions of journalists: Gain a traders' market insight in 5 minutes on [tendenz](https://tendenz.vercel.app).

## Roadmap
### Short-Term Goals
- Aggegrate over a wider range of assets including derivatives, indexes, and forex.
- Extend market coverage to Europe, Asia, South America, and the Middle East.
- Provide weekly and monthly data.
- Incorporate market trends and sector movements.

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
