import cleanupTotal from "../../src/cleanup-total";
import * as testbase from "./test-base"

const testBase = testbase;

describe("Cleanup_sanity", ()=> {
    it("cleanup test_A", async () => {
        await browser.url("http://www.google.com");
        cleanupTotal.addCleanup(async () => { await browser.pause(10); console.log("Clean1A") })
        
        cleanupTotal.addCleanup(async() => {await browser.pause(10); console.log("Clean2A") })
        
        cleanupTotal.addCleanup(async () => {await browser.pause(10); console.log("Clean3A") })
    });
});