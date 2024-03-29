
<script setup>
const siteIdParam = {
  name: 'site_id',
  type: 'number',
  required: true,
  description: 'the site\'s id'
};

const userIdParam = {
  name: 'user_id',
  type: 'number',
  required: true,
  description: 'the user\'s id'
};

const commentIdParam = {
  name: 'comment_id',
  type: 'number',
  required: true,
  description: 'the comment\'s id'
};

const contentParam = {
  name: 'content',
  type: 'string',
  required: true,
  where: 'json',
  description: 'the text content.'
};

const siteMetaParams = [{
  name: 'X-TALKEE-SITE-ID',
  type: 'string',
  required: true,
  where: 'header',
  description: 'site\'s id'
}, {
  name: 'X-TALKEE-SITE-SLUG',
  type: 'string',
  required: true,
  where: 'header',
  description: 'the slug of site'
}];

const siteMetaQueryParams = [{
  name: 'site_id',
  type: 'number',
  required: true,
  description: 'site\'s id'
}, {
  name: 'slug',
  type: 'string',
  required: true,
  description: 'the slug of site'
}];

const commentQueryParams = [{
  name: 'limit',
  type: 'number',
  required: false,
  description: 'the limitation of items in response'
}, {
  name: 'offset',
  type: 'number',
  required: false,
  description: 'the offset to start from'
}, {
  name: 'order_by',
  type: 'string',
  required: false,
  description: 'the order of items in response, can be "created_at", "created_at_asc" or "favor_count"'
}];

const repliesQueryParams = [{
  name: 'limit',
  type: 'number',
  required: false,
  description: 'the limitation of items in response'
}, {
  name: 'offset',
  type: 'number',
  required: false,
  description: 'the offset to start from'
}];

const loginParams = [{
  name: 'method',
  type: 'string',
  required: true,
  where: 'json',
  description: 'the login method, can be "mixin_token" or "mvm"'
}, {
  name: 'mixin_token',
  type: 'string',
  required: false,
  where: 'json',
  description: 'the access token of mixin, should be signed for `/me` or a regular Mixin OAuth token. Only required when `method` is "mixin_token"'
}, {
  name: 'signature',
  type: 'string',
  required: false,
  where: 'json',
  description: 'the signature of the message, generated by EIP-4361 process. Only required when `method` is "mvm"'
}, {
  name: 'signed_message',
  type: 'string',
  required: false,
  where: 'json',
  description: 'the signed message. It is a JSON object contains all required fields of EIP-4361. Only required when `method` is "mvm"'
}, {
  name: 'lang',
  type: 'string',
  required: false,
  where: 'json',
  description: 'the language of user, 2 letters, like "en", "ja" etc.'
}];

const airdropParams = [{
  name: 'airdrop_type',
  type: 'string',
  required: true,
  where: 'json',
  description: 'the airdrop type. support "comments", "comment", "user", "slug"'
}, {
  name: 'site_id',
  type: 'number',
  required: false,
  where: 'json',
  description: 'the site\'s id. It\'s required for "slug" and "comments" airdrop type.'
}, {
  name: 'slug',
  type: 'string',
  required: false,
  where: 'json',
  description: 'the site\'s slug. It\'s required for "slug" and "comments" airdrop type.'
}, {
  name: 'opponent_id',
  type: 'number',
  required: false,
  where: 'json',
  description: 'opponent\'s id. It\'s required for "user" and "comment" airdrop type. For "user" airdrop type, it should be the user\'s id. For "comment" airdrop type, it should be the comment\'s id.'
}, {
  name: 'strategy_name',
  type: 'string',
  required: false,
  where: 'json',
  description: 'the airdrop strategy name, support "topn" or "avg". It\'s required for "comments" airdrop type.'
}, {
  name: 'strategy_params',
  type: 'json',
  required: false,
  where: 'json',
  description: 'the airdrop strategy params. It\'s required for "comments" airdrop type. For "topn", it should be a JSON object contains "n" field, like {"n": 3}.',
}, {
  name: 'asset_id',
  type: 'UUID',
  required: true,
  where: 'json',
  description: 'the asset id to airdrop'
}, {
  name: 'amount',
  type: 'string',
  required: true,
  where: 'json',
  description: 'how much to airdrop. The precision should be 8, like "1.23456789"'
}, {
  name: 'memo',
  type: 'string',
  required: true,
  where: 'json',
  description: 'the memo of the airdrop transaction'
}, {
  name: 'redirect_url',
  type: 'string',
  required: true,
  where: 'json',
  description: 'the redirect url after airdrop'
}]
</script>