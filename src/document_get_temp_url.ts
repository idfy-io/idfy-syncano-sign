const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  syncanoHelper.signereJsonResponse(
      (c, a) => {
          return c.Document_GetTempViewUrl(a.DocumntId);
      },
      { DocumentId: "required|regex:[0-9a-fA-F]{32}" });
}
