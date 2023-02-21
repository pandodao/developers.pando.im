# Botastic API

<!--@include: ../../parts/botastic-api-params.md-->

## Create Indexes

<APIEndpoint method="GET" url="/indexes" />

This API will create an index with current `app_id`

The payload should be a JSON array containing multiple records to be indexed, with the following fields:

```json
[
  {
    // the object id of the record to be indexed
    "object_id": "pando.im/news/news/2022/2022-12-21-protocol-upgrade-and-integration-plan",
    // the category of the record to be indexed. Please use "plain-text"
    "category": "plain-text",
    // the data of the record to be indexed. For "plain-text" category, this field should be the plain text of the record.
    "data": "In the past more than one year, Pando protocols have grown quickly and successfully. We are determined to keep the momentum going and hope to do even better with the support of our long-term users and new partners.",
    // any additional properties of the record to be indexed, optional
    "properties": "",
  },
  // ...
]
```

### Response

```json
@TODO
```

## Search Indexes

<APIEndpoint method="GET" url="/search?keywords=:keywords&n=:n" />

This API will search a specific index with keywords.

<APIParams :params="searchIndexParams" />

### Response

```json
@TODO
```