declare namespace Mixin {
  export interface Asset {
    asset_id: string;
    asset_key: string;
    balance: string;
    capitalization: number;
    chain_id: string;
    change_btc: string;
    change_usd: string;
    confirmations: number;
    destination: string;
    icon_url: string;
    mixin_id: string;
    name: string;
    price_btc: string;
    price_usd: string;
    reserve: string;
    symbol: string;
    tag: string;
    type: string;
    last_updated_ts: number;
    id: string;
    logo: string;
    amount?: object;
  }

  export type Fiats = {
    code: string;
    rate: string;
  }[];

  export interface Profile {
    type: string;
    user_id: string;
    identity_number: string;
    phone: string;
    full_name: string;
    biography: string;
    avatar_url: string;
    relationship: string;
    mute_until: string;
    created_at: string;
    is_verified: boolean;
    is_scam: boolean;
    session_id: string;
    pin_token_base64: string;
    code_id: string;
    code_url: string;
    has_pin: boolean;
    device_status: string;
    has_emergency_contact: boolean;
    receive_message_source: string;
    accept_conversation_source: string;
    accept_search_source: string;
    fiat_currency: string;
    transfer_notification_threshold: number;
    transfer_confirmation_threshold: number;
  }

  export interface UTXO {
    type: string;
    user_id: string;
    utxo_id: string;
    asset_id: string;
    transaction_hash: string;
    output_index: number;
    amount: string;
    threshold: number;
    members: string[];
    memo: string;
    state: string;
    sender: string;
    created_at: string;
    updated_at: string;
    signed_by: string;
    signed_tx: string;
  }

  export interface DecodedTxInput {
    hash: string;
    index: number;
  }

  export interface DecodedTxOutput {
    amount: string;
    keys: string[];
    mask: string;
    script: string;
    type: number;
  }

  export interface DecodedTx {
    asset: string;
    extra: string;
    hash: string;
    hex: string;
    inputs: DecodedTxInput[];
    outputs: DecodedTxOutput[];
    signatures: string;
    version: number;
  }

  export interface MultisigTx {
    action: string;
    amount: string;
    asset_id: string;
    code_id: string;
    created_at: string;
    memo: string;
    raw_transaction: string;
    receivers: string[];
    request_id: string;
    senders: string[];
    signers: string[];
    state: string;
    threshold: number;
    transaction_hash: string;
    type: string;
    user_id: string;
  }

  export interface ExternSignaturePayload {
    method: string;
    params: string[];
  }
}
