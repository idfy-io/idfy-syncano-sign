import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    CanceledDate: "required|date",
    DocumentID: "required|regex:[0-9a-fA-F]{32}",
    //Explanation: "min:2",
    Signature: "required|min:2"
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.Document_Cancel(a),
    validation
);