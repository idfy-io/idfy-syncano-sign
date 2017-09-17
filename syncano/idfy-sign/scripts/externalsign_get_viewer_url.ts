import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    DocumentId: "required|regex:[0-9a-fA-F]{32}",
    Domain: "url",
    Language: SyncanoHelper.validationRules.required_language
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.ExternalSign_GetIframeUrl(a.DocumentId, a.Domain, a.Language),
    validation
);