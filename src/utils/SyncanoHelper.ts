import { SignereClient } from '@idfy/legacy';
import { validate } from 'syncano-validate';
import Syncano from 'syncano-server';
import { AxiosError, AxiosResponse } from 'axios';
const util = require("util");
export class SyncanoHelper {
    response: any;
    ctx: any;
    constructor(ctx: any) {
        const { response } = new Syncano(ctx);
        this.ctx = ctx;
        this.response = response;
    }

    signereAction<T>(fn: (client: SignereClient, args: any) => Promise<T>): Promise<T> {
        return fn(this.getSignereClient(), this.ctx.args);
    }

    signereJsonResponse<T>(fn: (client: SignereClient, args: any) => Promise<T>, validationRules: any) {
        const promise = validationRules ? validate(this.ctx.args, validationRules) : Promise.resolve();
        return promise.then(() => fn(this.getSignereClient(), this.ctx.args)
            .then(r => {
                console.log("JSON RESPONSE"); console.log(r);
                this.response.json(r)
                return r;
            })
        ).catch((err: AxiosError) => {
            let error = {
                error: err.response ? err.response.data : util.inspect(err, {depth:6}),
                status: err.code,
            };
            this.response.json(error);
            return error;
        });
    }

    signereResponse<T>(fn: (client: SignereClient, args: any) => Promise<T>, validationRules: any): Promise<T> {
        const promise = validationRules ? validate(this.ctx.args, validationRules) : Promise.resolve();
        return promise.then(() => fn(this.getSignereClient(), this.ctx.args)
            .then(r => r
            ).catch((err: AxiosError) => {
                let error = {
                    error: err.response ? err.response.data : util.inspect(err, {depth:6}),
                    status: err.code,
                };
                this.response.json(error);
                return error;
            }));
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
