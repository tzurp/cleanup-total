class CleanupTotal {
    _errorCount:number;
    _cleanupList: Array<Function>;

    constructor() {
        this._cleanupList = [];
        this._errorCount = 0;
    }

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
     * Insert a cleanup function that will execute last. Usually you'll want to use 'addCleanup'. 
     * @param cleanupFunction 
     */
    insertCleanup(cleanupFunction: Function): void {
        this._cleanupList.unshift(cleanupFunction);
    }

    async finalize(): Promise<void> {
        let message = "";

        this._cleanupList.reverse();

        for (let i = 0; i < this._cleanupList.length; i++) {
            try {
                await this._cleanupList[i]();
                message = `CleanupTotal [🙂 processId:${process.pid}]: Successfully executed '${this._cleanupList[i].toString()}'`;
            }
            catch (ex) {
                this._errorCount++;

                message = `CleanupTotal [😕 processId:${process.pid}]: Failed to execute '${this._cleanupList[i].toString()}: ${ex}'`;
            }
            finally {
                console.log(message);
            }
        }

        this._cleanupList.length = 0;

        if(this._errorCount > 0) {
            console.log(`CleanupTotal: Warning!!!: Cleanup for process ${process.pid} finished with ${this._errorCount} errors`);
        }
    }
}
export default new CleanupTotal();