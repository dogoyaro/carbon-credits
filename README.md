This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the project:

- copy the

```bash
   $ make up

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To stop the project:

```bash
   $ make down
```

To rebuild the project:

```bash
   $ make again
```

To run tests:

```bash
    $ make test
```

## Discussion

- The core business logic for recommending a portfolio is an optimization problem with the constraints related to the distribution_weight and the maximum amount of tonns the user has requested. My solution attempts to built on Dynamic programming principles typically resembling those used in solving the **Knapsack Problem**, where intermediate solutions are aggregated to find the maximum value. This

This solution however fails to be efficient because on every request, it must exhaust the full length of projects in the data layer to find the maximum amount of tonns provideable.

#### Data Model

Projects have been modelled as Documents, as there are no relationships existing between them, and documents allow for better localization. This is why MongoDB, a good (NoSQL database) was used.

#### Caching

Due to the highly inefficient nature of the solution, a caching layer to provide some memoization for previous calculations was used. This was solved using REDIS

### Improvements

- I would take more time to device a more efficient algorithm for calculating the Maximum provideable tonnage
- More controls for interacting with the data by the user, like recommendations based on minimised price, pagination on project views, etc.
- Reduction of the impedance mismatch between the Data layer and the implementation by adding a Schema using Mongoose, etc.

### Built With:

- NextJs - Full stack application
- MongoDb - Data Layer
- Redis - Caching Layer
- Vitest/React testing library - Testing framework
- Docker + Compose
