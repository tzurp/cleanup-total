import cleanupTotal from "../../src/cleanup-total";

beforeEach(() => {
    cleanupTotal.initialize();
});

afterEach(() => {
    cleanupTotal.finalize();
});