# Changelog

## 1.0.2 

- Effective Date: `2023-07-30`
- Affected Protocols: all protocols

We plan to add a new field `checksum` to the action, which is used to verify the integrity of the action.

Please read the draft [here](https://developers.pando.im/references/action.html#pando-action-protocol-checksum)

## 1.0.1

- Effective Date: `2023-05-31`
- Affected Protocols: all protocols

The Action protocol has been released in the new version of the Pando Web App (4swap). Developers can now try migrating to Action V2.

The new V2 removed encryption and makes the encoding much simpler. Of course, we still provide Go and JS SDKs to assist with the encoding process. It's also not difficult to implement it in other programming languages.

Previous discussion: https://github.com/orgs/pandodao/discussions/9

Other protocols' action will be updated in the future.

## 1.0.0

- Effective Date: `2023-03-30`
- Affected Protocols: `4swap`

For the reasons of performance, 4swap will make the following changes to the swap action:

In the event that `route_hash` is empty in the [swap action](../references/4swap/action#swap), 4swap will execute the swap in the pool of the from and to tokens. Please note that in this scenario, 4swap will not choose the best route. 

Furthermore, if there is no pool available for the from and to tokens, the swap will fail and a refund will be issued.