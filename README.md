# QuotesAPI

## Quotes Endpoints

### 1. Get All Quotes

**Endpoint:** `GET /api/v1/quotes/`

**Query Parameters:**

- `page` (optional): Specifies the page number for pagination. Defaults to `1` if not provided

**Description:**
Fetches all quotes with pagination support.

**Example Request:**

```shell
GET /api/v1/quotes/?page=2
```

**Example Response:**

```json
{
  "message": "success",
  "data": {
    "quotes": [
      {
        "quote_id": 11,
        "quote": "Yesterday is history, tomorrow is a mystery, today is a gift, which is why we call it the present.",
        "author": "Eleanor Roosevelt",
        "author_id": 14
      },
      {
        "quote_id": 12,
        "quote": "Happiness is not something ready-made. It comes from your own actions.",
        "author": "Dalai Lama",
        "author_id": 16
      },
      {
        "quote_id": 13,
        "quote": "The only limit to our realization of tomorrow will be our doubts of today.",
        "author": "Franklin D. Roosevelt",
        "author_id": 1
      },
      {
        "quote_id": 14,
        "quote": "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
        "author": "James Baldwin",
        "author_id": 17
      },
      {
        "quote_id": 15,
        "quote": "The journey of a thousand miles begins with one step.",
        "author": "Lao Tzu",
        "author_id": 18
      },
      {
        "quote_id": 16,
        "quote": "It does not matter how slowly you go as long as you do not stop.",
        "author": "Confucius",
        "author_id": 20
      },
      {
        "quote_id": 17,
        "quote": "Life is 10% what happens to us and 90% how we react to it.",
        "author": "Charles R. Swindoll",
        "author_id": 22
      },
      {
        "quote_id": 18,
        "quote": "Nothing is impossible, the word itself says 'I'm possible'!",
        "author": "Audrey Hepburn",
        "author_id": 23
      },
      {
        "quote_id": 19,
        "quote": "We must let go of the life we have planned, so as to accept the one that is waiting for us.",
        "author": "Joseph Campbell",
        "author_id": 24
      },
      {
        "quote_id": 20,
        "quote": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Eleanor Roosevelt",
        "author_id": 14
      }
    ],
    "total_pages": 4
  },
  "status": 200
}
```

---

### 2. Get Quote by ID

**Endpoint:** `GET /api/v1/quotes/:id`

**Path Parameters:**

- `id`: The ID of the quote to retrieve

**Desciption:**
Fetches a quote by its ID.

**Example Request:**

```shell
GET /api/v1/quotes/6
```

**Example Response:**

```json
{
  "message": "success",
  "data": {
    "quote_id": 6,
    "quote": "Change your thoughts and you change your world.",
    "author": "Norman Vincent Peale",
    "author_id": 10
  },
  "status": 200
}
```

---

### 2. Get Random Quote

**Endpoint:** `GET /api/v1/quotes/random`

**Desciption:**
Fetches a random quote.

**Example Request:**

```shell
GET /api/v1/quotes/random
```

**Example Response:**

```json
{
  "message": "success",
  "data": {
    "quote_id": 27,
    "quote": "It is never too late to be what you might have been.",
    "author": "George Eliot",
    "author_id": 33
  },
  "status": 200
}
```

---

## Authors Endpoints

### 1. Get All Authors

**Endpoint:** `GET /api/v1/authors/`

**Query Parameters:**

- `page` (optional): Specifies the page number for pagination. Defaults to `1` if not provided

**Description:**
Fetches all authors with pagination support.

**Example Request:**

```shell
GET /api/v1/authors/?page=2
```

**Example Response:**

```json
{
  "message": "success",
  "data": {
    "authors": [
      {
        "author_id": 11,
        "author": "Robert Frost",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Robert_Frost_NYWTS_4.jpg/220px-Robert_Frost_NYWTS_4.jpg"
      },
      {
        "author_id": 12,
        "author": "Dr. Seuss",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Theodor_Seuss_Geisel_%2801037v%29.jpg/220px-Theodor_Seuss_Geisel_%2801037v%29.jpg"
      },
      {
        "author_id": 13,
        "author": "Mahatma Gandhi",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/220px-Mahatma-Gandhi%2C_studio%2C_1931.jpg"
      },
      {
        "author_id": 14,
        "author": "Eleanor Roosevelt",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Eleanor_Roosevelt_portrait_1933.jpg/220px-Eleanor_Roosevelt_portrait_1933.jpg"
      },
      {
        "author_id": 15,
        "author": "Thomas Edison",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/220px-Thomas_Edison2.jpg"
      },
      {
        "author_id": 16,
        "author": "Dalai Lama",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Dalailama1_20121014_4639.jpg/220px-Dalailama1_20121014_4639.jpg"
      },
      {
        "author_id": 17,
        "author": "James Baldwin",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/James_Baldwin_37_Allan_Warren_%28cropped%29.jpg/220px-James_Baldwin_37_Allan_Warren_%28cropped%29.jpg"
      },
      {
        "author_id": 18,
        "author": "Lao Tzu",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zhang_Lu-Laozi_Riding_an_Ox.jpg/220px-Zhang_Lu-Laozi_Riding_an_Ox.jpg"
      },
      {
        "author_id": 19,
        "author": "E.E. Cummings",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/E._E._Cummings_NYWTS.jpg/220px-E._E._Cummings_NYWTS.jpg"
      },
      {
        "author_id": 20,
        "author": "Confucius",
        "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Confucius_Tang_Dynasty.jpg/220px-Confucius_Tang_Dynasty.jpg"
      }
    ],
    "total_pages": 4
  },
  "status": 200
}
```

---

### 2. Get Author by ID

**Endpoint:** `GET /api/v1/authors/:id`

**Path Parameters:**

- `id`: The ID of the author to retrieve

**Desciption:**
Fetches an author by its ID.

**Example Request:**

```shell
GET /api/v1/authors/6
```

**Example Response:**

```json
{
  "message": "success",
  "data": {
    "author_id": 6,
    "author": "John Lennon",
    "author_image_link": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/John_Lennon%2C_1974_%28restored_cropped%29.jpg/220px-John_Lennon%2C_1974_%28restored_cropped%29.jpg"
  },
  "status": 200
}
```

---
