const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {};

  syncanoHelper.signereJsonResponse(
      (c, a) => c.Status_ServerTime(),
      validation
  );
}
