[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Paikz/express-jwt-verify-middleware/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Paikz/express-jwt-verify-middleware/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/Paikz/express-jwt-verify-middleware/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Paikz/express-jwt-verify-middleware/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Paikz/express-jwt-verify-middleware/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Paikz/express-jwt-verify-middleware/build-status/master)

# express-jwt-verify-middleware

An Express middleware used to verify incoming tokens in requests and decode them for further use.

## Installation

`npm install express-jwt-verify-middleware --save`

## How to use

```
var jwtMiddleware = require('express-jwt-verify-middleware');
var router        = express.Router();

router.use(jwtMiddleware("jwtSecret"));

```

If a token is found and it is successfully verified the incoming route can use `.decoded` in the request.
