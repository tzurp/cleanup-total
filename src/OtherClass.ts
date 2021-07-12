import cleanupTotal from "./cleanup-total";

export class OtherClass {
    do() {
        console.log("Hello from other class");

        cleanupTotal.addCleanup(()=> console.log("*** Cleanup from OtherClass ***"));
    }

}