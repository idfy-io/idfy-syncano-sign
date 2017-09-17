import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    NewDeadline: "required|date",
    DocumentID: "required|regex:[0-9a-fA-F]{32}",
    //NotifySMS: "boolean",
    //NotifyEmail: "boolean"
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.Document_Cancel(a),
    validation
);