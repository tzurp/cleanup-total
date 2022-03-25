import cleanupTotal from "../../src/cleanup-total";
import * as testbase from "./test-base"

const testBase = testbase;

describe("Cleanup_sanity", () => {
    it("cleanup test", async () => {
        console.log("Creating account...");
        
        cleanupTotal.addCleanup(() => console.log("Delete account"));

        console.log("Adding investment plan...");
        
        cleanupTotal.addCleanup(()=> console.log("Remove investment plan"));

        console.log("Intentional Error...");
        
        cleanupTotal.addCleanup(()=> {throw new Error("Dummy Error")});

        console.log("Depositing money...");
        
        cleanupTotal.addCleanup(() => console.log("Remove deposit"));
    });
});