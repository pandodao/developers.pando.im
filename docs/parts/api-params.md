
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

</script>
