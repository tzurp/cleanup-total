import cleanupTotal from "../src/cleanup-total";

_serviceOptions: { loggerMethod: (Function)}

beforeEach(() => {
    cleanupTotal.initialize();
});

afterEach(() => {
    cleanupTotal.finalize({customLoggerMethod: (m: string)=> console.log(m), logErrorsOnly: false});
});