export class Logger {
    private _serviceOptions: ServiceOptions;

    constructor(serviceOptions: ServiceOptions) {
        this._serviceOptions = serviceOptions;
    }

    printToLog(message: string, isMandatory: boolean) {
        if (isMandatory || !isMandatory && !this._serviceOptions.logErrorsOnly) {
            if (this._serviceOptions?.customLoggerMethod != undefined) {
                try {
                    this._serviceOptions.customLoggerMethod(message);
                }
                catch (err) {
                    console.log(`CleanupTotal: printing to custom logger ${this._serviceOptions.customLoggerMethod.name} failed: ${err}`);
                }
            }
            else {
                console.log(message);
            }
        }
    }
}
