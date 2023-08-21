![tendenz logo](https://github.com/Clueed/tendenz/assets/7318830/080c9e2e-da2e-46f2-982c-9bf4fba90300#gh-dark-mode-only)

https://tendenz.vercel.app

---


This project emerged from a personal need to stay updated about financial markets without the influence of biased viewpoints or the time-consuming nature of manual research. Tendenz aims to be a starting point for further investigation.

This is accomplished by improving upon _the biggest winners/losers_ by considering historical volatility in combination with the most recent price movements. Specifically, Tendenz aims to rank the price movements of financial assets by their statistical significance as measured by the [z-score](https://tendenz.vercel.app/docs/statistical-significants).

By applying this methodology across an entire market, we can identify assets undergoing highly unusual events. This gets even more interesting once we extend our method to more obscure assets which typically get very little 'mainstream' coverage. Japanese rice futures collapse? Credit default swaps of a Brazilian bank shot up?


Being a first-stage MVP, which is focused on UX, IU, and PMF, this is currently only done for daily returns of US equities.


For those without the time budget for manual research and lacking interest in the opinions of journalists: Gain a traders' market insight in 5 minutes on [tendenz](https://tendenz.vercel.app).

## Roadmap
### Product
#### Short-term
- Increase information density on assets
- Advanced filtering (asset type, market cap, sector)
- Robust 3rd party data platforms integration (yahoo/google finance, etc.)
- Provide weekly and monthly data.
#### Long-Term
- Aggegrate over a wider range of assets including derivatives, indexes, and forex.
- Extend market coverage to Europe, Asia, South America, and the Middle East.
- Incorporate market trends and sector movements. 
- User accounts (personalize, save settings)

### Tech
- Transition to mono repo
- Strategy for complex time-series binning
- Monitoring and metrics
- Separate jobs from API 
- Write better code

## Stack
- [Typescript](https://www.typescriptlang.org/) 
- __Frontend:__ [Next.js](https://nextjs.org/), [Radix UI Primitives](https://www.radix-ui.com/primitives), [Tailwind CSS](https://tailwindcss.com/), [SWR](https://swr.vercel.app/), [Framer Motion](https://www.framer.com/motion/), [Font Awesome](https://fontawesome.com/)
- __Backend:__ [Node.js](https://nodejs.org/), [Fastify](https://www.fastify.io/), [Prisma](https://www.prisma.io/), [Axios](https://axios-http.com/), [Bree](https://github.com/breejs/bree), [Luxon](https://moment.github.io/luxon/), [p-limit](https://github.com/sindresorhus/p-limit)
- __Hosting:__ [Vercel](https://vercel.com/), [Fly.io](https://fly.io/), [Fly Postgres](https://fly.io/docs/postgres/)
- __Data:__ [Polygon.io](https://polygon.io/)


## Dev environment

### Backend
```sh
fly proxy 5432 -a tendenz-db
```

In `server/`

```sh
npm i
npx prisma generate
npm run dev
```

- Jobs are not scheduled unless `NODE_ENV === 'production'`
    - For testing, they should be run manually with
    - `npm run build && node ./dist/jobs/...js` 


#### Backend .env

```env
DATABASE_URL="postgres://{username}:{password}@localhost:5432/tendenz_server?connection_limit=5"
```

- `/tendenz_server` specifies the database of the backend server
- `connection_limit=5` fixes an issue with high CPU count machines. The default setting sometimes opens more connections than postgres can handle.

```env
POLYGON_API_KEY1="XXXX"
POLYGON_API_KEY2="XXXX"
```
(Can be identical as long as multiple jobs don't run concurrently.)


### Frontend
In `web/`

```sh
npm i
npm run dev
```
