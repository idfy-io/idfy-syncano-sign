import Syncano from 'syncano-server';
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      DocumentId: "required|regex:[0-9a-fA-F]{32}",
  };

  return syncanoHelper.signereJsonResponse(
      (c, a) => c.Document_GetDocument(a.DocumentId),
      validation
  );
}
