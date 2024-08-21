console.log("Hello");

const http = require("http");

/** Handle GET request */
function getHandler(req, res, reqUrl) {
  res.writeHead(200);
  res.write("GET parameters: " + reqUrl.searchParams);
  res.end();
}

/** Handle POST request */
function postHandler(req, res, reqUrl) {
  let body = "";
  req.setEncoding("utf8");
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    const name = data["name"];
    res.writeHead(200);
    res.write("Hello, " + name + "!");
    res.end();
  });
}

/** Handle Echo GET request */
function echoGET(req, res, reqUrl) {
  const name = reqUrl.searchParams.get("name");
  res.writeHead(200);
  res.write(`Hello ${name}`);
  res.end();
}

/** Handle Echo POST request */
function echoPOST(req, res, reqUrl) {
  let body = "";
  req.setEncoding("utf8");
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    res.writeHead(200);
    const data = JSON.parse(body);
    const name = data["name"];
    res.write(`Hello, ${name}!`);
    res.end();
  });
}

/** Handle cases where no related function is found */
function noResponse(req, res) {
  res.writeHead(404);
  res.write("Sorry, but we have no response..\n");
  res.end();
}

http
  .createServer((req, res) => {
    // Create an object for all redirection options
    const router = {
      "GET/retrieve-data": getHandler,
      "POST/send-data": postHandler,
      "GET/echo": echoGET,
      "POST/echo": echoPOST,
      default: noResponse,
    };

    // Parse the URL using the WHATWG URL API
    let reqUrl = new URL(req.url, "http://127.0.0.1/");

    // Find the related function by searching "method + pathname" and run it
    let redirectedFunc =
      router[req.method + reqUrl.pathname] || router["default"];
    redirectedFunc(req, res, reqUrl);
  })
  .listen(8080, () => {
    console.log("Server is running at http://127.0.0.1:8080/");
  });
