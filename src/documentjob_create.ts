const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      Contact_Email: "required|email",
      Contact_Phone: "required|min:2",
      //Contact_Name: "min:2",
      //Contact_Mobile: "min:2",
      //Contact_Url: "min:2",
  };

  syncanoHelper.signereJsonResponse(
      (c, a) => c.DocumentJob_Create(a),
      validation
  );
}
