# cleanup-total

With this plugin for [webdriver.io](https://webdriver.io/) it is easy to properly cleanup after each test.

<h2>Installation</h2>
The easiest way to install this module as a (dev-)dependency is by using the following command:

```
npm install wdio-cleanuptotal-service --save
```
Or:

```
npm install wdio-cleanuptotal-service --save-dev
```

<h2>Usage</h2>

Add wdio-cleanuptotal-service to your `wdio.conf.js`:

```
exports.config = {
  // ...
  services: ['cleanuptotal']
  // ...
};
```
...or with the service options:

```
exports.config = {
  // ...
  services: [
      ['cleanuptotal',
      // The options (with default values)
        {
           
        }]
      ]
  // ...
};
```

<h2>Options</h2>

<h2>Usage in test</h2>

Just import <b>cleanuptotal</b> where you need it, whether it be your test file or any other class:

```
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
            // ...
            const accountId = createAccount("John Blow");
            
            cleanupTotal.addCleanup(async () => { await deleteAccountByUserId(accountId) });

            deposit(accountId, 1000000);

            cleanupTotal.addCleanup(async () => { await deleteAccountByUserId(accountId) });
            //...
        });
```

<h2>Typescript support</h2>

Typescript is supported for this plugin.