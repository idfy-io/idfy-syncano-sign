import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    SigneeRefId: "required|regex:[0-9a-fA-F]{32}",
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.ExternalSign_GetMobileSignSessionStatus(a.SigneeRefId),
    validation
);