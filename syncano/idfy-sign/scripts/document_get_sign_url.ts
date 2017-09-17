import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    //SigneeRefId: "regex:[0-9a-fA-F]{32}",
    DocumentID: "required|regex:[0-9a-fA-F]{32}",
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.Document_GetSignUrl(a.DocumentId, a.SigneeRefId),
    validation
);