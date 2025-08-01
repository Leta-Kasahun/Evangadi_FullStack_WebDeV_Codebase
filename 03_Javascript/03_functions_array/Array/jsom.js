
        // 1. Convert object to JSON string
            const person = { name: "Alice", age: 30 };
            const jsonString = JSON.stringify(person, null, 2);
            console.log(jsonString);
            /* 
            {
              "name": "Alice",
              "age": 30
            }
            */

            // 2. Parse JSON string to object
            const jsonStr = '{"name":"Bob","age":25}';
            const obj = JSON.parse(jsonStr);
            console.log(obj.name); // "Bob"

            // 3. Convert array to JSON string
            const fruits = ["apple", "banana", "cherry"];
            console.log(JSON.stringify(fruits, null, 2));
            /* 
            [
              "apple",
              "banana",
              "cherry"
            ]
            */

            // 4. Store nested object as JSON string
            const data = {
                user: "Charlie",
                scores: [10, 20, 30],
                active: true
            };
            console.log(JSON.stringify(data, null, 2));
            /* 
            {
              "user": "Charlie",
              "scores": [10, 20, 30],
              "active": true
            }
            */

            // 5. Parse JSON with nested arrays
            const jsonNested = `{
  "users": [
    {"id": 1, "name": "David"},
    {"id": 2, "name": "Eve"}
  ]
}`;
            const usersObj = JSON.parse(jsonNested);
            console.log(usersObj.users[1].name); // "Eve"

            // 6. Convert boolean to JSON string
            const boolValue = true;
            console.log(JSON.stringify(boolValue)); // "true"

            // 7. Safely send complex data to server
            const message = {
                from: "Alice",
                to: "Bob",
                content: "Hello!",
                timestamp: Date.now()
            };
            const jsonMsg = JSON.stringify(message);
            console.log(jsonMsg);

  