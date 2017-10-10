const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      //SigneeRefId: "regex:[0-9a-fA-F]{32}",
      DocumentID: "required|regex:[0-9a-fA-F]{32}",
  };

  syncanoHelper.signereJsonResponse(
      (c, a) => c.Document_GetSignUrl(a.DocumentId, a.SigneeRefId),
      validation
  );
}
