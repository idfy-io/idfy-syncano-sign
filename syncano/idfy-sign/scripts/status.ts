import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.Status_ServerTime(),
    validation
);