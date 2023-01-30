
<script setup>
const durParam =   {
  name: 'dur',
  type: 'string',
  required: false,
  description: 'The duration of returning data. for example, 4320h means latest 180 days'
};

const baseAndQuoteParams = [
  {
    name: 'base',
    type: 'uuid',
    required: true,
    description: 'The base asset id'
  },
  {
    name: 'quote',
    type: 'uuid',
    required: true,
    description: 'The quote asset id'
  }
];

const followIdParam = {
  name: 'follow_id',
  type: 'uuid',
  required: true,
  description: 'The follow id to trace the order'
};

const txQueryParams = [{
  name: 'next_cursor',
  type: 'number',
  required: false,
  description: 'The next cursor to fetch next page'
}, {
  name: 'limit',
  type: 'number',
  required: false,
  description: 'The limit of returned items'
}];

const actionParams = [{
  name: 'action',
  type: 'string',
  where: 'json',
  required: true,
  description: 'action protocol data',
}, {
  name: 'amount',
  type: 'string',
  where: 'json',
  required: false,
  description: 'amount of transaction',
}, {
  name: 'asset_id',
  type: 'string',
  where: 'json',
  required: false,
  description: 'asset uuid of transaction',
}, {
  name: 'broker_id',
  type: 'string',
  where: 'json',
  required: false,
  description: 'broker id, leave it empty to use 4swap\'s default broker',
}, {
  name: 'trace_id',
  type: 'string',
  where: 'json',
  required: false,
  description: 'an UUID to trace the transaction.',
}];
</script>
