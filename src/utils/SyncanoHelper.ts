import { SignereClient } from '@idfy/legacy';
const util = require('util');
const { validate } = require('syncano-validate');
const Syncano = require('syncano-server');

export class SyncanoHelper {
    response: any;
    ctx: any;
    constructor (ctx: any) {
      const {response} = new Syncano(ctx);
      this.ctx = ctx;
      this.response = response;
    }

    signereAction<T>(fn: (client: SignereClient, args: any) => Promise<T>): Promise<T> {
        return fn(this.getSignereClient(), this.ctx.args);
    }

    signereJsonResponse<T>(fn: (client: SignereClient, args: any) => Promise<T>, validationRules: any) {
        const promise = validationRules ? validate(this.ctx.args, validationRules) : Promise.resolve();
        return promise.then(() => fn(this.getSignereClient(), this.ctx.args)
            .then(r =>
                this.response.json(r))
        ).catch((err: any) =>
            this.response.json({ error: util.inspect(err) }));
    }

    signereResponse<T>(fn: (client: SignereClient, args: any) => Promise<T>, validationRules: any) : Promise<T> {
        const promise = validationRules ? validate(this.ctx.args, validationRules) : Promise.resolve();
        return promise.then(() => fn(this.getSignereClient(), this.ctx.args)
            .then(r => r
            ).catch((err: any) =>
                this.response.json({ error: util.inspect(err) })));
    }

    validationRules = {
        required_guid: "required|regex:[0-9a-fA-F]{32}",
        guid: "regex:[0-9a-fA-F]{32}",
        required_language: "required|in:NO,EN,SV,FI,DA",
        language: "in:NO,EN,SV,FI,DA",
        document_type: "in:PDF,XML,TEXT",
        required_document_type: "required|in:PDF,XML,TEXT",
        required_identityProvider: "required|in:UNKNOWN,NO_BANKID_MOBILE,NO_BANKID_WEB,SWE_BANKID,SWE_BANKID_MOBILE,NO_BUYPASS,NO_BUYPASS,DA_NEMID,FI_TUPAS",
        identityProviderRegex: "in:UNKNOWN,NO_BANKID_MOBILE,NO_BANKID_WEB,SWE_BANKID,SWE_BANKID_MOBILE,NO_BUYPASS,NO_BUYPASS,DA_NEMID,FI_TUPAS"
    };

    getSignereClient(): SignereClient {
        return new SignereClient(
            this.ctx.config.API_ID,
            this.ctx.config.API_PRIMARY_KEY,
            this.ctx.config.API_SECONDARY_KEY,
            this.ctx.config.TEST,
            this.ctx.config.PING_TOKEN
        );
    }
}
