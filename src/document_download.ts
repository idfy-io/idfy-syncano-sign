const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      Type: "required|in:SDO,PADES,PDF",
      DocumentId: "required|regex:[0-9a-fA-F]{32}"
  };

  let args : any;

  syncanoHelper.signereResponse(
      (c, a) => { args = a; return a.Type == "SDO" ?
          c.DocumentFile_GetSdo(a.DocumentId) : (a.Type == "PDF" ?
              c.DocumentFile_GetUnsignedPdf(a.DocumentId) :
              c.DocumentFile_GetSignedPdf(a.DocumentId)) },
      validation
  ).then(r => {
      if(args.Type == "SDO") {
          response(r, 200, "application/x-seid-sdo", {
              "Content-Transfer-Encoding": "Binary",
              "Content-Disposition": "attachment; filename=\"" + args.DocumentId + ".sdo\"",

          });
      } else {
          response(r, 200, "application/pdf", {
              "Content-Transfer-Encoding": "Binary",
              "Content-Disposition": "attachment; filename=\"" + args.DocumentId + ".pdf\"",
          });
      }
  });
}
