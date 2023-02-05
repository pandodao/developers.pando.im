
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
  description: 'the login method, only support "mixin" now'
}, {
  name: 'mixin_access_token',
  type: 'string',
  required: true,
  where: 'json',
  description: 'the access token of mixin, should be signed for `/me`'
}, {
  name: 'lang',
  type: 'string',
  required: false,
  where: 'json',
  description: 'the language of user, 2 letters, like "en", "zh" etc.'
}];
</script>