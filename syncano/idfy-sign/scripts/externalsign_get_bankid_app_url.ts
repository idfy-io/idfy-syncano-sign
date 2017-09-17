import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    SigneeRefId: "required|regex:[0-9a-fA-F]{32}",
    DocumentId: "required|regex:[0-9a-fA-F]{32}",
    UserAgent: "required|min:2"
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.ExternalSign_CreateMobileAppLaunchUri(a),
    validation
);