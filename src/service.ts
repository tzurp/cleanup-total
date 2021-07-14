import cleanupTotal from "./cleanup-total";


export default class CleanupTotalService {
    browser: WebdriverIO.Browser;
    _serviceOptions: {loggerMethod: Function };
    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ foo: 'bar' }`
     */
    constructor(serviceOptions: { loggerMethod: Function}, capabilities: any, config: any, browser: WebdriverIO.Browser) {
        this.browser = browser
        this._serviceOptions = serviceOptions;
    }

    before(config: any, capabilities: any) {
         // Before all hook
    }

    beforeTest(test: any, context: any) {
        cleanupTotal.initialize();
    }

    beforeScenario(test: any, context: any) {
        cleanupTotal.initialize();
    }

    async afterTest(test: any, context: any, { error, result, duration, passed, retries }: any) {
        await cleanupTotal.finalize(this._serviceOptions);
    }

    async afterScenario({ result }: any) {
        await cleanupTotal.finalize(this._serviceOptions);
    }

    async after(exitCode: any, config: any, capabilities: any) {
        
    }
}
