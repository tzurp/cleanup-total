import cleanupTotal from "../../src/cleanup-total";
import * as testbase from "./test-base"

const testBase = testbase;

describe("Cleanup_sanity", ()=> {
    it("cleanup test", async () => {
        await browser.url("http://www.google.com");
        cleanupTotal.addCleanup(async () => { await browser.pause(10); console.log("Clean1") });
        cleanupTotal.addCleanup(async() => { await browser.pause(10); throw new Error("Error self"); console.log("Clean2") });
        cleanupTotal.addCleanup(async () => { await browser.pause(10); throw new Error("Error self"); console.log("Clean3") });
    });
});