# Matrix Web

Frontend of Matrix

## SDK

Log probe for SRPC services.

[./matrix.js](./matrix.js)

```js
const matrix = require('./matrix.js')
matrix.setService('service id', 'service secret')

srpc({ before: matrix.log })

// call this function to submit actively
matrix.submit()
```
