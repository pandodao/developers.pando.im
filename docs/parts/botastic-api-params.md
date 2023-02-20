
<script setup>
const createIndexParams = [{
  name: 'name',
  type: 'string',
  required: true,
  description: 'the name of index',
}, {
  name: 'object_id',
  type: 'string',
  where: 'json',
  required: true,
  description: 'the object id of the record to be indexed',
}, {
  name: 'category',
  type: 'string',
  where: 'json',
  required: true,
  description: 'the category of the record to be indexed. Please use "plain-text"',
}, {
  name: 'data',
  type: 'string',
  where: 'json',
  required: true,
  description: 'the data of the record to be indexed. For "plain-text" category, this field should be the plain text of the record.',
}, {
  name: 'properties',
  type: 'string',
  where: 'json',
  required: false,
  description: 'any additional properties of the record to be indexed.',
}];
const searchIndexParams = [{
  name: 'keywords',
  type: 'string',
  required: true,
  description: 'the keywords to be searched',
}, {
  name: 'index_name',
  type: 'string',
  required: false,
  description: 'the name of index. If not provided, all indexes that owned by current app_id will be searched.',
}, {
  name: 'n',
  type: 'number',
  where: 'json',
  required: false,
  description: 'the number of results to be returned. Maximum is 128.',
}];
</script>
