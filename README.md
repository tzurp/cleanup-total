# cleanup-total

With the `cleanup-total` service for [webdriver.io](https://webdriver.io/), you can easily ensure proper cleanup after each test. The service provides a systematic way to mark entities for deletion immediately after creation. This is particularly useful when tests involve creating complex structures, such as a bank account with an investment plan and a deposit. Without proper cleanup, attempting to delete the account may result in errors, such as a refusal due to the account not being empty. However, with <b>cleanup-total</b>, entities are deleted in the correct order, ensuring that tests clean up after themselves and do not interfere with each other.

<h2>Installation</h2>
The easiest way to install this module as a (dev-)dependency is by using the following command:

```
npm install wdio-cleanuptotal-service --save-dev
```

<h2>Usage</h2>

Add wdio-cleanuptotal-service to your `wdio.conf.js`:

```
exports.config = {
  // ... other options

  services: ['cleanuptotal']

  // ... other options
};
```

or with the service options:

```
exports.config = {
  // ... other options

  services: [
    [
      'cleanuptotal',
      {
        // Use a custom logger function to write messages to the test report
        customLoggerMethod: console.log(), // TODO: replace with your own logger function if needed

        // Only write to the log when an error occurs to reduce clutter
        logErrorsOnly: false, // TODO: consider changing to 'true' if you have too many messages in the report
      }
    ]
  ]

  // ... other options
};
```

<h2>Usage in test</h2>

You can import the <b>cleanuptotal</b> service wherever it's needed, whether it's in your test file or any other class.

```
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Create an account and add it to the cleanup list for deletion after the test
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Add an investment plan to the account and add it to the cleanup list
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Deposit funds into the account and add it to the cleanup list
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Note that the actual cleanup code will be executed after the test is complete
```

<h2>Typescript support</h2>

Typescript is supported for this plugin.