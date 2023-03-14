# Changelog

## 1.0.0

- Effective Date: `2023-03-15`
- Affected Products: `4swap`

::: info
Due to the project progress, the effective date of this version have to postpone to `2023-03-30`. We will keep updating.
:::

For the reasons of performance, 4swap will make the following changes to the swap action:

In the event that `route_hash` is empty in the [swap action](../references/4swap/action#swap), 4swap will execute the swap in the pool of the from and to tokens. Please note that in this scenario, 4swap will not choose the best route. 

Furthermore, if there is no pool available for the from and to tokens, the swap will fail and a refund will be issued.