
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

const readConvTurnParams = [conversationIDParam,turnIDParam,{
  name: 'block_until_response',
  type: 'boolean',
  required: false,
  description: 'if set, the request will be blocked and will not return until it is processed.',
}, {
  name: 'timeout',
  type: 'duration',
  required: false,
  description: 'only takes effect when block_until_response is set, return 408 HTTP status code if processing does not complete within the specified duration.',
}];
</script>
