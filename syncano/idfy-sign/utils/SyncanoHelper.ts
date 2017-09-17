import { SignereClient } from '@idfy/legacy';
const { validate } = require("syncano-validate");
const { response } = require('syncano-server');
const util = require('util');

declare var ARGS: any;
declare var CONFIG: any;

export class SyncanoHelper {

    static args : any = ARGS;
    static config: any = CONFIG;

    static signereAction<T>(fn: (client: SignereClient, args: any) => Promise<T>): Promise<T> {
        return fn(this.getSignereClient(), ARGS);
    }

    static signereJsonResponse<T>(fn: (client: SignereClient, args: any) => Promise<T>, validationRules: any) {
        const promise = validationRules ? validate(ARGS, validationRules) : Promise.resolve();
        return promise.then(() => fn(this.getSignereClient(), ARGS)
            .then(r =>
                response.json(r))
        ).catch((err: any) =>
            response.json({ error: util.inspect(err) }));
    }

    static signereResponse<T>(fn: (client: SignereClient, args: any) => Promise<T>, validationRules: any) : Promise<T> {
        const promise = validationRules ? validate(ARGS, validationRules) : Promise.resolve();
        return promise.then(() => fn(this.getSignereClient(), ARGS)
            .then(r => r
            ).catch((err: any) =>
                response.json({ error: util.inspect(err) })));
    }

    static validationRules = {
        required_guid: "required|regex:[0-9a-fA-F]{32}",
        guid: "regex:[0-9a-fA-F]{32}",
        required_language: "required|in:NO,EN,SV,FI,DA",
        language: "in:NO,EN,SV,FI,DA",
        document_type: "in:PDF,XML,TEXT",
        required_document_type: "required|in:PDF,XML,TEXT",
        required_identityProvider: "required|in:UNKNOWN,NO_BANKID_MOBILE,NO_BANKID_WEB,SWE_BANKID,SWE_BANKID_MOBILE,NO_BUYPASS,NO_BUYPASS,DA_NEMID,FI_TUPAS",
        identityProviderRegex: "in:UNKNOWN,NO_BANKID_MOBILE,NO_BANKID_WEB,SWE_BANKID,SWE_BANKID_MOBILE,NO_BUYPASS,NO_BUYPASS,DA_NEMID,FI_TUPAS"
    };

    static getSignereClient(): SignereClient {
        return new SignereClient(
            CONFIG.API_ID,
            CONFIG.API_PRIMARY_KEY,
            CONFIG.API_SECONDARY_KEY,
            CONFIG.TEST,
            CONFIG.PING_TOKEN
        );
    }

}