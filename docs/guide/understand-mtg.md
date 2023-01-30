# Understand MTG

## What's MTG?

MTG stands for "[Mixin Trusted Group](https://developers.mixin.one/docs/mainnet/mtg/overview)" and is a multi-sig technology based application development paradigm. 

Each MTG implementation can be considered a side chain of the Mixin Network, comprised of multiple, independent nodes that reach consensus through multi-sig technology on the Mixin main network.

Pando uses MTG to manage assets in a decentralized manner, with nodes referred to as "MTG Nodes". Currently, there are three protocols built on MTG: [4swap/Pando Lake](https://pando.im/4swap), [Pando Leaf](https://pando.im/leaf), and [Pando Rings](https://pando.im/rings), all managed and controlled by a group of nodes.

The MTG information can be read through calling `/info` API, with the `members` and `threshold` combination representing the unique multi-sig address on the Mixin Network.

<!--@include: ../parts/responses/4swap-info.md-->

## How Pando's MTG works?

Each Pando MTG is basically a multi-sig address owned by the group of MTG Nodes. These nodes monitor incoming transactions to the multi-sig address.

When a transaction is sent to the multi-sig address, the MTG Nodes handle it individually, verifying the transaction and processing the data carried by it according to the protocols' requirements. They then reach consensus by signing transactions.

When a response transaction is required, the MTG Nodes sign and send it to the Mixin Network, which broadcasts it to the entire network.

## Interaction with Pando's MTG

To send transactions to MTG automatically, you need to create applications.

To send transactions to MTG by human, a supported wallet must be used. 

A list of supported wallets can be found in the "[Supported Wallets](/guide/wallets)" section. When sending multi-sig transactions from a wallet, similar screens should appear:

<p>
<img src="./assets/mm-mtg.webp" width="320" />
<strong>Mixin Messenger</strong>
</p>

<p>
<img src="./assets/fennec-mtg.webp" width="320" />
<strong>Fennec</strong>
</p>

<p>
<img src="./assets/metamask-mtg.webp" width="320" />
<strong>Metamask and WalletConnect compatible wallets</strong>
</p>

::: warning
Please note that for the limitation of Metamask and WalletConnect compatible wallets, there is no obvious way to identify the MTG transactions. You may need to check the opponent's address and transaction memo to identify the MTG transactions.
::: 


