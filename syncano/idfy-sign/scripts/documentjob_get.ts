import { SyncanoHelper } from './../utils/SyncanoHelper';

const validation = {
    JobId: "required|regex:[0-9a-fA-F]{32}",
};

SyncanoHelper.signereJsonResponse(
    (c, a) => c.DocumentJob_GetJob(a.JobId),
    validation
);