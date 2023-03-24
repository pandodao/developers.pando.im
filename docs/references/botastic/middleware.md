# Middleware

Botastic's middleware feature allows you to inject additional data into your requests before they are sent to the LLMs. This enables LLMs to access extra knowledge that is not included within themselves, similar to [OpenAI's plugins](https://openai.com/blog/chatgpt-plugins).

For instance, if you are building a customer service chatbot and want it to be able to answer questions about your product, you can use middleware to inject relevant product information, FAQs, and other knowledge into the LLM. This enables the LLM to respond accurately to customer inquiries.

## Built-in Middlewares

Botastic has built-in middlewares that can be used directly:

### 1. botastic-search

`botastic-search` will search existing knowledge base using the [Botastic Search API](https://developers.pando.im/references/botastic/api).

**Parameters**

1. `limit`: the maximum number of results to return. Default: `3`.
2. `app_id`: the Botastic app ID that used for searching

### 2. duckduckgo-search

`duckduckgo-search` is a middleware that uses DuckDuckGo's search API to search the web, and put the result into the prompt.

**Parameters**

1. `limit`: the maximum number of results to return. Default: `3`.

