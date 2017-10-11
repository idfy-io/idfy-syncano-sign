import Syncano from 'syncano-server';
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      SigneeRefId: "required|regex:[0-9a-fA-F]{32}",
      DocumentId: "required|regex:[0-9a-fA-F]{32}",
      DateOfBirth: "required|regex:[0-9]{6}",
      Mobile: "required|min:2",
      ReceiptSMS: "boolean"
  };

  return syncanoHelper.signereJsonResponse(
      (c, a) => c.ExternalSign_StartMobileSignSession(a),
      validation
  );
}
