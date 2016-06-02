# api-health-check
this module inspiration by (express-healthcheck)[https://github.com/lennym/express-healthcheck]


## Installation

```
npm install api-health-check
```

## Usage

```
app.use('/healthcheck', require('api-health-check')());
```

This will respond with a JSON payload of `{ "uptime": [uptime in seconds] }` and a 200 status code.
