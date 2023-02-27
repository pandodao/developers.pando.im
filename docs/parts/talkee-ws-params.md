
<script setup>
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

const msgFilterParam = {
  name: 'filter',
  type: 'string',
  required: true,
  description: 'the filter name of messages, can only be "latest"'
};

const msgCreateParams = [{
  name: 'category',
  type: 'string',
  required: true,
  where: "json",
  description: 'the category of message, can only be "text"'
}, {
  name: 'data',
  type: 'string',
  required: true,
  where: "json",
  description: 'the data of message, should be base64 encoded'
}, {
  name: 'message_id',
  type: 'uuid',
  required: true,
  where: "json",
  description: 'An uuid of message'
}]
</script>