
<script setup>
const assetParam = {
  name: 'asset',
  type: 'uuid',
  required: true,
  description: 'the asset id'
};

const catParam = {
  name: 'cat',
  type: 'uuid',
  required: true,
  description: 'the collateral id'
};

const txQueryParams = [{
  name: 'cursor',
  type: 'number',
  required: false,
  description: 'the cursor to start from'
}, {
  name: 'limit',
  type: 'number',
  required: false,
  description: 'the limitation of items in response'
}];

const flipParam = {
  name: 'flip',
  type: 'uuid',
  required: false,
  description: 'the flip\'s id'
};

const vatParam = {
  name: 'vat',
  type: 'uuid',
  required: false,
  description: 'the vat\'s id'
};
</script>