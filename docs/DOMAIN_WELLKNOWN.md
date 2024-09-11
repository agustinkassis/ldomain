# Domain .well-known

A json file should be accesable `$DOMAIN/.well-known/domain.json` with the following structure:

- title: The name of the domain
- logo: The url of the logo image
- description (optional): A description of the domain
- apiEndpoint (optional): The url of the api endpoint (Lightning Domain API) (Default: https://lightningdomain.io/api)
- adminPubkey: The hex encoded public key of the admin

```json
{
  "title": "La Crypta",
  "logo": "https://image_url",
  "description": "https://pbs.twimg.com/profile_images/1755606302951411712/5HjGkdHm_400x400.jpg",
  "apiEndpoint": "https://lightningdomain.io/domain",
  "adminPubkey": "hex_pubkey"
}
```
