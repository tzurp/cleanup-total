import cleanupTotal from "../../src/cleanup-total";

_serviceOptions: { loggerMethod: (Function)}

beforeEach(() => {
    cleanupTotal.initialize();
});

afterEach(() => {
    cleanupTotal.finalize({loggerMethod: (m: string)=> console.log("CustomLoger: " + m)});
});