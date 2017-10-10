const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      CanceledDate: "required|date",
      DocumentID: "required|regex:[0-9a-fA-F]{32}",
      //Explanation: "min:2",
      Signature: "required|min:2"
  };

  syncanoHelper.signereJsonResponse(
      (c, a) => c.Document_Cancel(a),
      validation
  );
}
