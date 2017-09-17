import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    DocumentId: "required|regex:[0-9a-fA-F]{32}",
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.Document_GetDocument(a.DocumentId),
    validation
);