import cleanupTotal from "../../src/cleanup-total";
import * as testbase from "../test-base"

const testBase = testbase;

describe("Cleanup suite", () => {
    it("cleanup fail", async () => {
        console.log("Creating account1...");

        cleanupTotal.addCleanup(() => { console.log("Delete account1"); throw new Error("Dummy Error1"); });

        console.log("Adding investment plan1...");

        cleanupTotal.addCleanup(() => { console.log("Remove investment plan1"); throw new Error("Dummy Error1"); });

        console.log("Depositing funds1...");

        cleanupTotal.addCleanup(() => console.log("Remove funds1"));

        expect(5).toBe(2 + 2);
    });

    it("cleanup success", async () => {
        console.log("Creating account2...");

        cleanupTotal.addCleanup(() => console.log("Delete account2"));

        console.log("Adding investment plan2...");

        cleanupTotal.addCleanup(() => console.log("Remove investment plan2"));

        console.log("Depositing funds2...");

        cleanupTotal.addCleanup(() => console.log("Remove deposit2"));

        expect(5).toBe(3 + 2);
    });
});