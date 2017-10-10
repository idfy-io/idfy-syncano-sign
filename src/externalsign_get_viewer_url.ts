const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      DocumentId: "required|regex:[0-9a-fA-F]{32}",
      Domain: "url",
      Language: syncanoHelper.validationRules.required_language
  };

  syncanoHelper.signereJsonResponse(
      (c, a) => c.ExternalSign_GetIframeUrl(a.DocumentId, a.Domain, a.Language),
      validation
  );
}
