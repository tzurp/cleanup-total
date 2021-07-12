
import "expect-webdriverio"
import cleanupTotal from "../../src/cleanup-total";
import * as testbase from "./test-base"

const testBase = testbase;
describe.skip('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://the-internet.herokuapp.com/login`);
        cleanupTotal.addCleanup(() => console.log("Cleanup Start"));

        await (await $('#username')).setValue('tomsmith');
        await (await $('#password')).setValue('SuperSecretPassword!');
        cleanupTotal.addCleanup(() => console.log("Cleanup Middle"));
        await (await $('button[type="submit"]')).click();

        cleanupTotal.addCleanup(() => console.log("Cleanup Final"));

        await expect($('#flash')).toBeExisting();
        await expect($('#flash')).toHaveTextContaining(
            'You logged into a secure area!');
    });

    it("cleanup test", () => {
        cleanupTotal.addCleanup(() => { console.log("Tzur") })

        cleanupTotal.addCleanup(() => { console.log("Paldi") })

        cleanupTotal.addCleanup(() => { console.log("Hayogev") })
    });
});
