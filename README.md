license-normalizer
==================

Attempts to normalize all the different ways people put license information in their package.json files.

usage
-----

```javascript

var format = require('normalize-license');

var license = format(json);
```

There is also a "guessing" feature:

`format(json, true);`

This will attempt to look into the `json.readme` property to "Guess" the license.

build
-----


