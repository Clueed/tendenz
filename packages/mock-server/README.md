# `@tendenz/mock-server`

- Simplest way to work on frontend locally.
- Serve static API responses mimicking the behavior of `@tendenz/server` but without DB access.
- This happen through mapping (hash-seed-pseudoRand) URL queries to set orders of `dummyData.js`. Thus, the same queries will yield stable responses, pagination will work, and changes in querries will emulate filtering with responses overlapping in values. This is neccessary because 'overlapping' responses---where certain elements stay the same---are animated in the web app.
- Data is not randomly generated to allow for testing off ramps which need valid ticker-exchange combinations.

## Usage

```sh
turbo dev
```

## Todo

- [ ] Write script to refresh dummyData
