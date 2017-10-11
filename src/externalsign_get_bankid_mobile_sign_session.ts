import Syncano from 'syncano-server';
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      SigneeRefId: "required|regex:[0-9a-fA-F]{32}",
  };

  return syncanoHelper.signereJsonResponse(
      (c, a) => c.ExternalSign_GetMobileSignSessionStatus(a.SigneeRefId),
      validation
  );
}
