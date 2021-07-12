import cleanupTotal from "../../src/cleanup-total";
import { OtherClass } from "../../src/OtherClass";
import * as testbase from "./test-base"

const testBase = testbase;

describe("Cleanup_sanity", ()=> {
    it("cleanup test_A", async () => {
        await browser.url("http://www.google.com");
        cleanupTotal.addCleanup(async () => { await browser.pause(10);console.log("Clean1C") })

        new OtherClass().do();
        cleanupTotal.addCleanup(async() => { await browser.pause(10);console.log("Clean2C") })
        cleanupTotal.addCleanup(async() => { await browser.pause(10);console.log("Clean3C") })
    });
});