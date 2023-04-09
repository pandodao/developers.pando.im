---
outline: deep
---

# Middleware

Botastic's middleware feature allows you to inject additional data into your requests before they are sent to the LLMs. This enables LLMs to access extra knowledge that is not included within themselves, similar to [OpenAI's plugins](https://openai.com/blog/chatgpt-plugins).

For instance, if you are building a customer service chatbot and want it to be able to answer questions about your product, you can use middleware to inject relevant product information, FAQs, and other knowledge into the LLM. This enables the LLM to respond accurately to customer inquiries.

## Built-in Middlewares

Botastic has built-in middlewares that can be used directly:

### 1. botastic-search

`botastic-search` will search existing knowledge base using the [Botastic Search API](https://developers.pando.im/references/botastic/api).

**Parameters**

- `limit`: the maximum number of results to return. Default: `3`.
- `app_id`: the Botastic app ID that used for searching

### 2. duckduckgo-search

`duckduckgo-search` is a middleware that uses DuckDuckGo's search API to search the web, and put the result into the prompt.

**Parameters**

- `limit`: the maximum number of results to return. Default: `3`.

### 3. fetch

`fetch` is a middleware that fetches data from a URL and put the result into the prompt.

**Parameters**

- `url`: the URL to fetch data from.

**Usage**

```json
{
  "items": [{
    "name": "fetch", "options": {"url": "https://wttr.in/Tokyo?format=4"}
  }]
}
```

**Example**

```yaml
prompt: "You read the following weather information and explain: {{.MiddlewareOutput}}"
input: "Is tokyo hot?"
middleware output: "Tokyo: ☀️   🌡️+12°C 🌬️↖13km/h"
output: "The weather information provided for Tokyo indicates that it is sunny with a temperature of +12°C and a wind speed of 13 km/h blowing in the northwest direction. Whether or not Tokyo is hot is subjective and depends on personal preferences and what you consider to be hot. Some people may find +12°C to be cool, while others may find it to be warm."
```
