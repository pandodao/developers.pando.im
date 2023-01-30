# Pando Leaf Design Document

## Interact with Pando

All participants of Pando complete the interaction by transferring tokens to the multisig wallet.
Node worker **Syncer** syncs the payments as mixin multisig outputs; another worker **Payee** processes all outputs in order.

![Pando Design](./assets/mtg_design.webp)

### Mixin Multisig Output

**Output:**

| field     | description      |
| --------- | ---------------- |
| Sender    | user mixin id    |
| CreatedAt | payment time     |
| AssetID   | payment asset id |
| Amount    | payment amount   |
| Memo      | extra message    |

**Output Memo:**

Memo contain the **TransactionAction** information, see details in [DecodeTransactionAction](https://github.com/fox-one/pando/blob/main/core/action.go).

The memo is maybe AES-encrypted, an ed25519 public key used for compound AES key/iv will be in the first 32 bytes.

### TransactionAction Definition

| field    | description                                | type  |
| -------- | ------------------------------------------ | ----- |
| FollowID | user defined trace id for this transaction | uuid  |
| Body     | action type & relevant parameters          | bytes |

## Workers

1. **Syncer** sync unhanded utxo by mixin messenger api & store into WalletStore as **outputs** in updated asc order.
2. **Payee** pull unhanded utxo from WalletStore in order and parse memo to get the action then handle it. Transfers may be created during handling.
3. **Assigner** select enough unspent UTXO and assign to a pending transfer.
4. **Cashier** pull unhandled transfers from WalletStore in order, then request & sign multisig transfer. If enough signatures collected, generate a raw transaction.
5. **TxSender** commit raw transactions to Mixin Network.

### Syncer Workflow

![Syncer Workflow](./assets/pando-syncer.webp)

### Payee Workflow

![Payee Workflow](./assets/pando-payee.webp)

### Assigner & Cashier & TxSender Workflow

![Assigner & Cashier Workflow](./assets/pando-cashier.webp)

## Actions

All actions supported by Pando with groups cat,flip,oracle,proposal,sys and vat. see [core/action](https://github.com/fox-one/pando/blob/main/core/action.go) for details.

### Sys - system operations

#### #1 Withdraw

> pkg/maker/sys/withdraw.go

withdraw any assets from the multisig wallet, proposal required.

**Parameters:**

| name     | type | description         |
| -------- | ---- | ------------------- |
| asset    | uuid | withdraw asset id   |
| amount   | uuid | withdraw amount     |
| opponent | uuid | receiver's mixin id |

### Proposal - governance system

#### #11 Make

> pkg/maker/proposal/make.go

create a new proposal

**Parameters:**

| name | type  | description                                         |
| ---- | ----- | --------------------------------------------------- |
| data | bytes | action type & parameters will be executed if passed |

#### #12 Shout

> pkg/maker/proposal/shout.go

request node administrator to vote for this proposal

**Parameters:**

| name | type | description       |
| ---- | ---- | ----------------- |
| id   | uuid | proposal trace id |

#### #13 Vote

> pkg/maker/proposal/vote.go

vote for a proposal, nodes only. If enough votes collected, the attached action will be executed on all nodes automatically.

**Parameters:**

| name | type | description       |
| ---- | ---- | ----------------- |
| id   | uuid | proposal trace id |

### Cat - manager collaterals

#### #21 Create

> pkg/maker/cat/create.go

create a new collateral type, proposal required.

**Parameters:**

| name | type   | description          |
| ---- | ------ | -------------------- |
| gem  | uuid   | collateral asset id  |
| dai  | uuid   | debt asset id        |
| name | string | collateral type name |

#### #22 Supply

> pkg/maker/cat/supply.go

supply dai token to increase the total debt ceiling for this collateral type.
Payment asset id must be equal to the debt asset id.

**Parameters:**

| name | type | description         |
| ---- | ---- | ------------------- |
| id   | uuid | collateral trace id |

#### #23 Edit

> pkg/maker/cat/edit.go

modify collateral's one or more attributes, proposal required.

**Parameters:**

| name  | type   | description         |
| ----- | ------ | ------------------- |
| id    | uuid   | collateral trace id |
| key   | string | attribute name      |
| value | string | attributes value    |

#### #24 Fold

> pkg/maker/cat/fold.go

modify the debt multiplier(rate), creating / destroying corresponding debt.

**Parameters:**

| name | type | description         |
| ---- | ---- | ------------------- |
| id   | uuid | collateral trace id |

### Vat - manager vaults

#### #31 Open

> pkg/maker/vat/open.go

open a new vault with the special collateral type

**Parameters:**

| name | type    | description         |
| ---- | ------- | ------------------- |
| id   | uuid    | collateral trace id |
| debt | decimal | initial debt        |

#### #32 Deposit

> pkg/maker/vat/deposit.go

transfer collateral into a Vault.

**Parameters:**

| name | type | description    |
| ---- | ---- | -------------- |
| id   | uuid | vault trace id |

#### #33 Withdraw

> pkg/maker/vat/withdraw.go

withdraw collateral from a Vault, vault owner only.

**Parameters:**

| name | type    | description          |
| ---- | ------- | -------------------- |
| id   | uuid    | vault trace id       |
| dink | decimal | change in collateral |

#### #34 Payback

> pkg/maker/vat/payback.go

decrease Vault debt.

**Parameters:**

| name | type | description    |
| ---- | ---- | -------------- |
| id   | uuid | vault trace id |

#### #35 Generate

> pkg/maker/vat/generate.go

increase Vault debt, vault owner only.

**Parameters:**

| name | type    | description    |
| ---- | ------- | -------------- |
| id   | uuid    | vault trace id |
| debt | decimal | change in debt |

### Flip - manager auctions

#### #41 Kick

> pkg/maker/flip/kick.go

put collateral up for auction from an unsafe vault.

**Parameters:**

| name | type | description    |
| ---- | ---- | -------------- |
| id   | uuid | vault trace id |

#### #42 Bid

> pkg/maker/flip/bid.go

pay dai to participate in the auction.

> Starting in the tend-phase, bidders compete for a fixed lot amount of Gem with increasing bid amounts of Dai. Once tab amount of Dai has been raised, the auction moves to the dent-phase. The point of the tend phase is to raise Dai to cover the system's debt.
> During the dent-phase bidders compete for decreasing lot amounts of Gem for the fixed tab amount of Dai. Forfeited Gem is returned to the liquidated vault for the owner to retrieve. The point of the dent phase is to return as much collateral to the Vault holder as the market will allow.

**Parameters:**

| name | type    | description       |
| ---- | ------- | ----------------- |
| id   | uuid    | flip trace id     |
| lot  | decimal | collateral amount |

#### #43 Deal

> pkg/maker/flip/deal.go

claim a winning bid / settles a completed auction

**Parameters:**

| name | type | description   |
| ---- | ---- | ------------- |
| id   | uuid | flip trace id |

### Oracle - manager price oracle

#### #51 Create

> pkg/maker/oracle/create.go

register a new oracle for the asset, proposal required.

**Parameters:**

| name      | type      | description                              |
| --------- | --------- | ---------------------------------------- |
| id        | uuid      | asset id                                 |
| price     | decimal   | initial price                            |
| hop       | int64     | time delay in seconds between poke calls |
| threshold | int64     | number of governors required when poke   |
| ts        | timestamp | request timestamp                        |

#### #52 Edit

> pkg/maker/oracle/edit.go

modify an oracle's next price, hop & threshold, proposal required.

**Parameters:**

| name  | type   | description      |
| ----- | ------ | ---------------- |
| id    | uuid   | asset id         |
| key   | string | attribute name   |
| value | string | attributes value |

#### #53 Poke

> pkg/maker/oracle/poke.go

updates the current feed value and queue up the next one.

**Parameters:**

| name  | type      | description       |
| ----- | --------- | ----------------- |
| id    | uuid      | asset id          |
| price | decimal   | new next price    |
| ts    | timestamp | request timestamp |

#### #54 Rely

> pkg/maker/oracle/rely.go

add a new price feed to the whitelist, proposal required

**Parameters:**

| name | type  | description   |
| ---- | ----- | ------------- |
| id   | uuid  | feed mixin id |
| key  | bytes | public key    |

#### #55 Deny

> pkg/maker/oracle/deny.go

remove a price feed from the whitelist, proposal required

**Parameters:**

| name | type | description   |
| ---- | ---- | ------------- |
| id   | uuid | feed mixin id |
