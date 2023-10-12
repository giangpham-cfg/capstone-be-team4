# TasteBUD API

const API = "localhost://3000"

**Response:**

```
 {"success":true,"message":"Welcome to the TasteBUD server"}
```

---

## This server has two routes

- [Users](#users)
- [Recipes](#recipes)

---

# USERS

## GET

- [api/users/favorites](#getusersuseridfavorites) - Retrieves user information based on a provided authentication token.
- [api/users/token](#getuserstoken) - Retrieves user information based on a provided authentication token.

## POST

- [api/users/register](#postusersregister) - Allows users to register a new account
- [api/users/login](#postuserslogin) - Allows users to log in

## POST/users/register

Allows users to register a new account

- **Request:**

```javascript
fetch(`${API}/users/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "jazz",
    password: "123",
  }),
});
```

- **Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1MjQ3"
}
```

---

## POST/users/login

Allows users to log in

- **Request:**

```javascript
fetch(`${API}/users/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "jazz",
    password: "123",
  }),
});
```

- **Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDY1Mj"
}
```

---

## GET/users/token

- **Request:**

```javascript
fetch(`${API}/users/token`, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1m",
  },
});
```

- **Response:**

```json
{
  "success": true,
  "user": {
    "id": "03ca1281-ddb3-4421-a8f6-22c76b6a99b8",
    "username": "jazz"
  }
}
```

---

## GET/users/:userId/favorites

Retrieves a list of all recipes favorited by a specific user.

- **Request:**

```js
fetch(`${API}/users/53590905-8b5f-41b0-a48c-cecdfe582d06/favorites`, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1m",
  },
});
```

- **Response:**

```json
{
  "success": true,
  "userFavorites": [
    {
      "id": "6e4ea80e-e28a-4153-aabf-5bac9a102f61",
      "userId": "53590905-8b5f-41b0-a48c-cecdfe582d06",
      "recipeId": "25ba877e-fe32-4a54-b586-0d25f63e89f0",
      "recipes": {
        "id": "25ba877e-fe32-4a54-b586-0d25f63e89f0",
        "name": "POST RECIPE",
        "instruction": ["Instruction 1", "Instruction 2", "Instruction 3"],
        "ingredients": ["Ingredient 1", "Ingredient 2"],
        "mealTime": "BREAKFAST",
        "cookTime": "30 minutes",
        "createdAt": "2023-10-12T19:58:07.659Z",
        "updatedAt": "2023-10-12T19:58:07.659Z",
        "userId": "53590905-8b5f-41b0-a48c-cecdfe582d06"
      }
    },
    {
      "id": "dd1bf611-1205-4ce1-8b8f-18ad1072dfa8",
      "userId": "53590905-8b5f-41b0-a48c-cecdfe582d06",
      "recipeId": "fabd78a9-3ce6-4d2c-9936-eac2206db775",
      "recipes": {
        "id": "fabd78a9-3ce6-4d2c-9936-eac2206db775",
        "name": "Recipe 1",
        "instruction": ["Step 1", "Step 2"],
        "ingredients": ["Ingredient 1", "Ingredient 2"],
        "mealTime": "BREAKFAST",
        "cookTime": "30 minutes",
        "createdAt": "2023-10-12T16:34:20.293Z",
        "updatedAt": "2023-10-12T16:34:20.293Z",
        "userId": "b2536b0f-4ec0-4b91-90b4-27cef6a34276"
      }
    }
  ]
}
```

---

# Recipes

## GET

- [api/recipes](#getrecipes)
- [api/recipes/:recipeId](#getrecipesrecipeid)
- [api/recipes?mealtime={MEALTIME}](#getrecipesmealtimemealtime)

## POST

- [api/recipes/submit](#postrecipessubmit)
- [api/recipes/:recipeId/favorite](#postrecipesrecipeidfavorites)

## PATCH

- [api/recipes/:recipeId](#patchrecipesrecipeid)

## DELETE

- [api/recipes/:recipeId/favorite](#deleterecipesrecipeidfavorites)

## GET/recipes

Retrieves details of all the recipes

- **Request:**

`` fetch(`${API}/recipes`); ``

- **Response:**

```json
{
  "recipes": [
    {
      "id": "0972280d-f363-46a1-ad2a-b594ef824066",
      "name": "Recipe 3",
      "instruction": ["Instruction 1", "Instruction 2"],
      "ingredients": ["Ingredient 1"],
      "mealTime": "BREAKFAST",
      "cookTime": "35 minutes",
      "createdAt": "2023-10-10T10:47:52.421Z",
      "updatedAt": "2023-10-10T10:47:52.421Z",
      "userId": "53d245b9-0d64-473e-8bcc-200e01e98073",
      "user": {
        "username": "jazz",
        "id": "53d245b9-0d64-473e-8bcc-200e01e98073"
      },
      "comments": [
        {
          "id": "b03915bc-5f5a-4ab9-bd88-83664644709c",
          "text": "Great recipe!",
          "createdAt": "2023-10-10T12:36:50.424Z",
          "updatedAt": "2023-10-10T12:36:50.424Z",
          "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
          "recipeId": "0972280d-f363-46a1-ad2a-b594ef824066",
          "user": {
            "username": "ketsarin",
            "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59"
          }
        }
      ]
    },
    {
      "id": "1fb72fd8-bf5d-460e-9cf8-adaa676fc74c",
      "name": "LETS EDIT THIS",
      "instruction": ["Instruction 1", "Instruction 2", "Instruction 3"],
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "mealTime": "DINNER",
      "cookTime": "1 hour 30 minutes",
      "createdAt": "2023-10-10T12:46:47.935Z",
      "updatedAt": "2023-10-10T12:46:47.935Z",
      "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
      "user": {
        "username": "ketsarin",
        "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59"
      },
      "comments": []
    },
    {
      "id": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
      "name": "Recipe 1",
      "instruction": ["Step 1", "Step 2"],
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "mealTime": "BREAKFAST",
      "cookTime": "30 minutes",
      "createdAt": "2023-10-10T08:48:33.955Z",
      "updatedAt": "2023-10-10T08:48:33.955Z",
      "userId": "53d245b9-0d64-473e-8bcc-200e01e98073",
      "user": {
        "username": "jazz",
        "id": "53d245b9-0d64-473e-8bcc-200e01e98073"
      },
      "comments": [
        {
          "id": "5e455ac0-db86-4a94-8d89-d74bbb2c7a7b",
          "text": "Delish!",
          "createdAt": "2023-10-10T11:09:08.291Z",
          "updatedAt": "2023-10-10T11:09:08.291Z",
          "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
          "recipeId": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
          "user": {
            "username": "ketsarin",
            "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59"
          },
          {
            "id": "a86817cb-4dc1-4c7c-8b55-75bfb8af306c",
            "text": "This is a comment on Recipe 1",
            "createdAt": "2023-10-10T08:48:36.338Z",
            "updatedAt": "2023-10-10T08:48:36.338Z",
            "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
            "recipeId": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
            "user": {
              "username": "ketsarin",
              "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59"
            }
          }
        }
      ]
    }
  ]
}

```

---

## GET/recipes/recipeId

Retrieves details of a specific recipe.

- **Request:**
  ```js
  fetch(`${API}/recipes/2f3f7608-e2bf-4000-8a68-6f31ad8770ff`);
  ```
- **Response:**

```json
{
  "success": true,
  "recipe": {
    "id": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
    "name": "Recipe 1",
    "instruction": ["Step 1", "Step 2"],
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "mealTime": "BREAKFAST",
    "cookTime": "30 minutes",
    "createdAt": "2023-10-10T08:48:33.955Z",
    "updatedAt": "2023-10-10T08:48:33.955Z",
    "userId": "53d245b9-0d64-473e-8bcc-200e01e98073",
    "user": {
      "username": "jazz",
      "id": "53d245b9-0d64-473e-8bcc-200e01e98073"
    },
    "comments": [
      {
        "id": "5e455ac0-db86-4a94-8d89-d74bbb2c7a7b",
        "text": "Delish!",
        "createdAt": "2023-10-10T11:09:08.291Z",
        "updatedAt": "2023-10-10T11:09:08.291Z",
        "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
        "recipeId": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
        "user": {
          "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
          "username": "ketsarin",
          "password": "$2b$10$IdvAJoQeb3T9wTpnrfnYdewbEEIdAMRCRHyBhZJg2g2J7lDr6sqBG",
          "createdAt": "2023-10-10T08:48:31.187Z"
        }
      },
      {
        "id": "a86817cb-4dc1-4c7c-8b55-75bfb8af306c",
        "text": "This is a comment on Recipe 1",
        "createdAt": "2023-10-10T08:48:36.338Z",
        "updatedAt": "2023-10-10T08:48:36.338Z",
        "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
        "recipeId": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
        "user": {
          "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
          "username": "ketsarin",
          "password": "$2b$10$IdvAJoQeb3T9wTpnrfnYdewbEEIdAMRCRHyBhZJg2g2J7lDr6sqBG",
          "createdAt": "2023-10-10T08:48:31.187Z"
        }
      }
    ]
  }
}
```

---

## GET/recipes?mealtime={mealTime}

Retrieves a list of recipes based on the specified 'mealtime' query parameter. By including the 'mealtime' parameter in your GET request and providing a specific value for 'mealTime,' you can filter the recipes to display only those suitable for the chosen mealtime.

- **Request:**
  ```js
  fetch("/recipes?mealtime=BREAKFAST");
  ```
  #### values: BREAKFAST, LUNCH, DINNER, DESSERT
- **Response:**

```json
{
  "success": true,
  "recipes": [
    {
      "id": "0972280d-f363-46a1-ad2a-b594ef824066",
      "name": "Recipe 3",
      "instruction": ["Instruction 1", "Instruction 2"],
      "ingredients": ["Ingredient 1"],
      "mealTime": "BREAKFAST",
      "cookTime": "35 minutes",
      "createdAt": "2023-10-10T10:47:52.421Z",
      "updatedAt": "2023-10-10T10:47:52.421Z",
      "userId": "53d245b9-0d64-473e-8bcc-200e01e98073",
      "user": {
        "username": "jazz",
        "id": "53d245b9-0d64-473e-8bcc-200e01e98073"
      },
      "comments": [
        {
          "id": "b03915bc-5f5a-4ab9-bd88-83664644709c",
          "text": "Great recipe!",
          "createdAt": "2023-10-10T12:36:50.424Z",
          "updatedAt": "2023-10-10T12:36:50.424Z",
          "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
          "recipeId": "0972280d-f363-46a1-ad2a-b594ef824066",
          "user": {
            "username": "ketsarin"
          }
        }
      ]
    },
    {
      "id": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
      "name": "Recipe 1",
      "instruction": ["Step 1", "Step 2"],
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "mealTime": "BREAKFAST",
      "cookTime": "30 minutes",
      "createdAt": "2023-10-10T08:48:33.955Z",
      "updatedAt": "2023-10-10T08:48:33.955Z",
      "userId": "53d245b9-0d64-473e-8bcc-200e01e98073",
      "user": {
        "username": "jazz",
        "id": "53d245b9-0d64-473e-8bcc-200e01e98073"
      },
      "comments": [
        {
          "id": "5e455ac0-db86-4a94-8d89-d74bbb2c7a7b",
          "text": "Delish!",
          "createdAt": "2023-10-10T11:09:08.291Z",
          "updatedAt": "2023-10-10T11:09:08.291Z",
          "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
          "recipeId": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
          "user": {
            "username": "ketsarin"
          }
        },
        {
          "id": "a86817cb-4dc1-4c7c-8b55-75bfb8af306c",
          "text": "This is a comment on Recipe 1",
          "createdAt": "2023-10-10T08:48:36.338Z",
          "updatedAt": "2023-10-10T08:48:36.338Z",
          "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
          "recipeId": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
          "user": {
            "username": "ketsarin"
          }
        }
      ]
    },
    {
      "id": "c199bd46-9ff7-4dac-88ec-f3ef453be378",
      "name": "BFAST RECIPE",
      "instruction": ["Instruction 1", "Instruction 2", "Instruction 3"],
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "mealTime": "BREAKFAST",
      "cookTime": "25 minutes",
      "createdAt": "2023-10-10T14:45:32.859Z",
      "updatedAt": "2023-10-10T14:45:32.859Z",
      "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
      "user": {
        "username": "ketsarin",
        "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59"
      },
      "comments": []
    }
  ]
}
```

---

## POST/recipes/submit

Allows users to create a new recipe.

- **Request:**

```javascript
fetch(`${API}/recipes/submit`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1mZ",
  },
  body: JSON.stringify({
    name: "BFAST RECIPE",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    instruction: ["Instruction 1", "Instruction 2", "Instruction 3"],
    mealTime: "BREAKFAST",
    cookTime: "25 minutes",
  }),
});
```

- **Response:**

```json
{
  "success": true,
  "recipe": {
    "id": "c199bd46-9ff7-4dac-88ec-f3ef453be378",
    "name": "BFAST RECIPE",
    "instruction": ["Instruction 1", "Instruction 2", "Instruction 3"],
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "mealTime": "BREAKFAST",
    "cookTime": "25 minutes",
    "createdAt": "2023-10-10T14:45:32.859Z",
    "updatedAt": "2023-10-10T14:45:32.859Z",
    "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
    "user": {
      "username": "ketsarin",
      "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59"
    }
  }
}
```

---

## PATCH/recipes/:recipeId

Allows users to edit recipe

PATCH will allow client to send partial updates to the values of the recipe data

- **Request:**

```js
fetch(`${API}/recipes/c199bd46-9ff7-4dac-88ec-f3ef453be378`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2vySWQiOiIzYjExZDIzMy1mZ",
  },
  body: JSON.stringify({
    name: "BFAST RECIPE",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    instruction: ["Instruction 1", "Instruction 2", "Instruction 3"],
    mealTime: "BREAKFAST",
    cookTime: "25 minutes",
  }),
});
```

- **Response:**

```json
{
  "success": true,
  "recipe": {
    "id": "c199bd46-9ff7-4dac-88ec-f3ef453be378",
    "name": "BFAST RECIPE EDITED",
    "instruction": ["Instruction 1", "Instruction 2", "Instruction 3"],
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "mealTime": "BREAKFAST",
    "cookTime": "1 hour 20 minutes",
    "createdAt": "2023-10-10T14:45:32.859Z",
    "updatedAt": "2023-10-10T14:45:32.859Z",
    "userId": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59",
    "user": {
      "username": "ketsarin",
      "id": "98c9c1ea-8fa2-498d-9788-ac2ad0308d59"
    }
  }
}
```

---

## DELETE/recipes/:recipeId

Allows users to delete recipe

- **Request:**

```js
fetch(`${API}/recipes/c199bd46-9ff7-4dac-88ec-f3ef453be378`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2vySWQiOiIzYjExZDIzMy1mZ",
  },
});
```

- **Response:**

```json
{
  "success": true,
  "recipe": {
    "id": "8232c12d-a88d-4e34-a6a9-2ac09f9f982f",
    "name": "DELETE RECIPE",
    "instruction": ["Instruction 1", "Instruction 2", "Instruction 3"],
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "mealTime": "BREAKFAST",
    "cookTime": "30 minutes",
    "createdAt": "2023-10-12T19:40:44.126Z",
    "updatedAt": "2023-10-12T19:40:44.126Z",
    "userId": "53590905-8b5f-41b0-a48c-cecdfe582d06"
  }
}
```

---

## POST/recipes/:recipeId/favorites

Allows users to favorite a recipe.

- **Request:**

```js
fetch(`${API}/recipes/c199bd46-9ff7-4dac-88ec-f3ef453be378/favorites`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2vySWQiOiIzYjExZDIzMy1mZ",
  },
});
```

- **Response:**

```json
{
  "success": true,
  "addFavorite": {
    "id": "6134a99a-9306-4a10-aef4-4094243e021e",
    "userId": "53590905-8b5f-41b0-a48c-cecdfe582d06",
    "recipeId": "ef8fe92a-18a9-4ec7-9800-a32d9b40682c"
  }
}
```

## DELETE/recipes/:recipeId/favorites

Allows users to unfavorite a recipe.

- **Request:**

```js
fetch(`${API}/recipes/c199bd46-9ff7-4dac-88ec-f3ef453be378/favorites`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2vySWQiOiIzYjExZDIzMy1mZ",
  },
});
```

- **Response:**

```json
{
  "success": true,
  "recipe": {
    "id": "8232c12d-a88d-4e34-a6a9-2ac09f9f982f",
    "name": "POST RECIPE",
    "instruction": ["Instruction 1", "Instruction 2", "Instruction 3"],
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "mealTime": "BREAKFAST",
    "cookTime": "30 minutes",
    "createdAt": "2023-10-12T19:40:44.126Z",
    "updatedAt": "2023-10-12T19:40:44.126Z",
    "userId": "53590905-8b5f-41b0-a48c-cecdfe582d06"
  }
}
```
