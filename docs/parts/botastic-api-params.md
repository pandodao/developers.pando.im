
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
const conversationIDParam = {
  name: 'conversation_id',
  type: 'uuid',
  required: true,
  description: 'the conversation id',
}
</script>
