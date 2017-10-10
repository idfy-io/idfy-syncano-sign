const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      SigneeRefId: "required|regex:[0-9a-fA-F]{32}",
      DocumentId: "required|regex:[0-9a-fA-F]{32}",
      UserAgent: "required|min:2"
  };

  syncanoHelper.signereJsonResponse(
      (c, a) => c.ExternalSign_CreateMobileAppLaunchUri(a),
      validation
  );
}
