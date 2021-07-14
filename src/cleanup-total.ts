class CleanupTotal {
    private _errorCount:number;
    private _cleanupList: Array<Function>;

    constructor() {
        this._cleanupList = [];
        this._errorCount = 0;
    }

    /**
     * @deprecated Don't use this method if *wdio-cleanuptotal-service* is enabled.
     */
    initialize() {
        this._cleanupList = new Array<Function>();
        this._errorCount = 0;
    }

    /**
     * 
     * @param cleanupFunction Insert a cleanup function to the cleanup stack.
     */
    addCleanup(cleanupFunction: Function): void {
        this._cleanupList.push(cleanupFunction);
    }

    /**
     * @deprecated Don't use this method if *wdio-cleanuptotal-service* is enabled.
     */
    async finalize(serviceOptions: { customLoggerMethod: Function}): Promise<void> {
        let message = "";
        const processId = process.pid;

        this.printToLog(`CleanupTotal [${processId}]: ##### Cleanup initialized #####`, serviceOptions);

        this._cleanupList.reverse();

        for (let i = 0; i < this._cleanupList.length; i++) {
            try {
                await this._cleanupList[i]();
                message = `CleanupTotal [🙂 ${processId}]: Successfully executed '${this._cleanupList[i].toString()}'`;
            }
            catch (ex) {
                this._errorCount++;

                message = `CleanupTotal [😕 ${processId}]: Failed to execute '${this._cleanupList[i].toString()}: ${ex}'`;
            }
            finally {
                this.printToLog(message, serviceOptions)
            }
        }

        this._cleanupList.length = 0;

        if(this._errorCount > 0) {
            console.log(`CleanupTotal: Warning!!!: Cleanup for [${processId}] finished with ${this._errorCount} errors`);
        }

        this.printToLog(`CleanupTotal [${processId}]: ### Cleanup done ###`, serviceOptions);
    }

    private printToLog(message: string, serviceOptions: { customLoggerMethod: Function}) {
        console.log(message);

        if(serviceOptions?.customLoggerMethod != undefined) {
            try {
                serviceOptions.customLoggerMethod(message);
            }
            catch(err) {
                console.log(`CleanupTotal: printing to custom logger ${serviceOptions.customLoggerMethod.name} failed: ${err}`);
            }
        }
    }
}
export default new CleanupTotal();