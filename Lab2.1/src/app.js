const http = require("http");

const users = ["User 1", "User 2"];

const app = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    if (req.method === "GET") {
      res.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Trang web của tôi</title>
        </head>
          <body>
            <form method='post' action='/create-user'>
              <input type='text' name='username'/>
              <button type='submit' đ>Send</button>
            </form>
          </body>
        </html>
      `);
      res.end();
    }
  } else if (url === "/users") {
    if (req.method === "GET") {
      res.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Trang web của tôi</title>
        </head>
          <body>
            <ol>
              ${users.map((user) => "<li>" + user + "</li>")}
            </ol>
          </body>
        </html>
      `);
      res.end();
    }
  } else if (url === "/create-user") {
    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const parsedData = new URLSearchParams(body);
        const username = parsedData.get("username");
        users.push(username);

        res.statusCode = 302;
        res.setHeader("Location", "/users");
        res.end();
      });
    }
  } else {
    res.statusCode = 404;
    res.write("Not found");
    res.end();
  }
});

app.listen(3000);
