import { SyncanoHelper } from './../utils/SyncanoHelper';

SyncanoHelper.signereJsonResponse(
    (c, a) => {
        return c.Document_GetTempViewUrl(a.DocumntId);
    },
    { DocumentId: "required|regex:[0-9a-fA-F]{32}" });