
<script setup>
const searchIndexParams = [{
  name: 'keywords',
  type: 'string',
  required: true,
  description: 'the keywords to be searched',
}, {
  name: 'n',
  type: 'number',
  required: false,
  description: 'the number of results to be returned. Default is 16, maximum is 128.',
}];
const searchIndexObjectParam = {
  name: 'object_id',
  type: 'string',
  required: true,
  description: 'the object id',
}
const conversationIDParam = {
  name: 'conversation_id',
  type: 'uuid',
  required: true,
  description: 'the conversation id',
}
const turnIDParam = {
  name: 'turn_id',
  type: 'number',
  required: true,
  description: 'the turn id',
}
</script>
