const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      NewDeadline: "required|date",
      DocumentID: "required|regex:[0-9a-fA-F]{32}",
      //NotifySMS: "boolean",
      //NotifyEmail: "boolean"
  };

  syncanoHelper.signereResponse(
      (c, a) => c.DocumentConvert_Convert(a.file),
      {}
  );
}
