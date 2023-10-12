# TasteBUD API
const API = "localhost://3000" 

**Response:**

 ```
  {"success":true,"message":"Welcome to the TasteBUD server"}
``` 
----

# Recipes
## GET/recipes

Retrieves details of all the recipes

* **Request:**
  
```fetch(`${API}/tasks`);```
* **Response:**

```
{
  "success": true,
  "recipes": [
    {
      "id": "0972280d-f363-46a1-ad2a-b594ef824066",
      "name": "Recipe 3",
      "instruction": [
        "Instruction 1",
        "Instruction 2"
      ],
      "ingredients": [
        "Ingredient 1"
      ],
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
      "id": "1fb72fd8-bf5d-460e-9cf8-adaa676fc74c",
      "name": "LETS EDIT THIS",
      "instruction": [
        "Instruction 1",
        "Instruction 2",
        "Instruction 3"
      ],
      "ingredients": [
        "Ingredient 1",
        "Ingredient 2"
      ],
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
      "instruction": [
        "Step 1",
        "Step 2"
      ],
      "ingredients": [
        "Ingredient 1",
        "Ingredient 2"
      ],
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
}
```
---
## GET/recipes/recipeId
Retrieves details of a specific recipe.
  
* **Request:**
  ```
  fetch(`${API}/recipes/2f3f7608-e2bf-4000-8a68-6f31ad8770ff`);
  ```
* **Response:**
```
{
  "success": true,
  "recipe": {
    "id": "2f3f7608-e2bf-4000-8a68-6f31ad8770ff",
    "name": "Recipe 1",
    "instruction": [
      "Step 1",
      "Step 2"
    ],
    "ingredients": [
      "Ingredient 1",
      "Ingredient 2"
    ],
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

* **Request:**
  ```
  fetch('/recipes?mealtime=BREAKFAST')
  ```
values: BREAKFAST, LUNCH, DINNER, DESSERT 
* **Response:**
```
{
  "success": true,
  "recipes": [
    {
      "id": "0972280d-f363-46a1-ad2a-b594ef824066",
      "name": "Recipe 3",
      "instruction": [
        "Instruction 1",
        "Instruction 2"
      ],
      "ingredients": [
        "Ingredient 1"
      ],
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
      "instruction": [
        "Step 1",
        "Step 2"
      ],
      "ingredients": [
        "Ingredient 1",
        "Ingredient 2"
      ],
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
      "instruction": [
        "Instruction 1",
        "Instruction 2",
        "Instruction 3"
      ],
      "ingredients": [
        "Ingredient 1",
        "Ingredient 2"
      ],
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
  
* **Request:**
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
   cookTime: "25 minutes"
  }),
});

* **Response:**
```json
{
  "success": true,
  "recipe": {
    "id": "c199bd46-9ff7-4dac-88ec-f3ef453be378",
    "name": "BFAST RECIPE",
    "instruction": [
      "Instruction 1",
      "Instruction 2",
      "Instruction 3"
    ],
    "ingredients": [
      "Ingredient 1",
      "Ingredient 2"
    ],
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

---
## PATCH/recipes/recipeId
Allows users to edit recipe
PATCH will allow send partial updates to the values of the recipe data
  
* **Request:**
```javascript
fetch(`${API}/recipes/8dbd21ee-18d5-401e-a81d-dd9db6ca97db`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjExZDIzMy1mZ",
  },
  body: JSON.stringify({

// Fields that to be updated are passed

   name: "BFAST RECIPE EDITED", 
   mealTime: "BREAKFAST",
   cookTime: "1 hour 20 minutes"
  }),
});

* **Response:**
```json
{
  "success": true,
  "recipe": {
    "id": "c199bd46-9ff7-4dac-88ec-f3ef453be378",
    "name": "BFAST RECIPE EDITED",
    "instruction": [
      "Instruction 1",
      "Instruction 2",
      "Instruction 3"
    ],
    "ingredients": [
      "Ingredient 1",
      "Ingredient 2"
    ],
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







