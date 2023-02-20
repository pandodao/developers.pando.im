# Botastic API

<!--@include: ../../parts/botastic-api-params.md-->

## Create Indexes

<APIEndpoint method="GET" url="/indexes/:name" />

This API will create an index with the given index name.

<APIParams :params="createIndexParams" />

### Response

```json
@TODO
```

## Search Indexes

<APIEndpoint method="GET" url="/search?keywords=:keywords&index_name=:index_name&n=:n" />

This API will search a specific index with keywords

<APIParams :params="searchIndexParams" />

### Response

```json
@TODO
```