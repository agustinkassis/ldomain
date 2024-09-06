# Mail to Nostr

Receive mails and send it to Nostr.

### Receive a mail via an MTA

```bash
sudo apt install nullmailer
```

### Forward via bash script

Adjust config on `/etc/nullmailer/remotes`

### Bash script and CURL request

```bash
#!/bin/bash

# Read email from stdin
email=$(cat)

# Send email to HTTP endpoint via POST request
curl -X POST -H "Content-Type: text/plain" \
     --data "$email" \
     https://your-api-endpoint.com/email-handler
```

### Handle the request with a running server

Install Express and Body Parser:

```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse plain text body (the email will be sent as text)
app.use(bodyParser.text({ type: "*/*" }));

// POST route to receive email and extract destination address
app.post("/email-handler", (req, res) => {
  const emailData = req.body;

  // Simple regex to extract the 'To' email address
  const toAddress = emailData.match(/To: (.+)/i);

  if (toAddress && toAddress[1]) {
    console.log(`Destination email: ${toAddress[1].trim()}`);
  } else {
    console.log("No destination email found.");
  }

  res.status(200).send("Email received");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Map the email to a Nostr address

Verify destination map and publish a message to the pubkey using NIP-04
