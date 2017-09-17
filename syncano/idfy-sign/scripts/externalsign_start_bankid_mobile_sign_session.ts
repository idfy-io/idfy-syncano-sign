import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    SigneeRefId: "required|regex:[0-9a-fA-F]{32}",
    DocumentId: "required|regex:[0-9a-fA-F]{32}",
    DateOfBirth: "required|regex:[0-9]{6}",
    Mobile: "required|min:2",
    ReceiptSMS: "boolean"
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.ExternalSign_StartMobileSignSession(a),
    validation
);