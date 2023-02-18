import { Logger } from "./logger";
import { ServiceOptions } from "./service-options";

class CleanupTotal {
    private _cleanupList: Array<Function>;

    constructor() {
        this._cleanupList = [];
    }

    /**
     * @deprecated Don't use this method if *wdio-cleanuptotal-service* is enabled.
     */
    initialize() {
        this._cleanupList = new Array<Function>();
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
    async finalize(serviceOptions: ServiceOptions): Promise<void> {
        if (this._cleanupList.length <= 0) {
            return;
        }

        const errors = [];
        const logger = new Logger(serviceOptions);
        const processId = process.pid;

        logger.printToLog(`CleanupTotal [${processId}]: ##### Cleanup initialized #####`, false);

        this._cleanupList.reverse();

        for (let i = 0; i < this._cleanupList.length; i++) {
            try {
                await this._cleanupList[i]();

                const message = `CleanupTotal [🙂 ${processId}]: Successfully executed '${this._cleanupList[i].toString()}'`;

                logger.printToLog(message, false);
            }
            catch (err: any) {

                const message = `CleanupTotal [😕 ${processId}]: Failed to execute '${this._cleanupList[i].toString()}': ${err.message}, ${err.stack}`;

                errors.push(message);
            }
        }

        if (errors.length > 0) {
            logger.printToLog(`CleanupTotal: Warning!!!: Cleanup for [${processId}] finished with ${errors.length} error(s):`, true);

            errors.forEach(error => {
                logger.printToLog(error, true);
            });
        }

        this._cleanupList.length = 0;

        logger.printToLog(`CleanupTotal [${processId}]: ### Cleanup done ###`, false);
    }
}
export default new CleanupTotal();