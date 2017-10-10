const Syncano = require('syncano-server');
import {SyncanoHelper} from './utils/SyncanoHelper';

export default (ctx: any) => {
  const {data, events, response} = Syncano(ctx)
  const syncanoHelper = new SyncanoHelper(ctx)

  const validation = {
      //AddonServices: "array",
      //ConvertToPDFA2b: "boolean",
      //CreatedByApplication: "min:2",
      //CreatePADES: "boolean",
      Description: "required|min:2",
      DocumentType: syncanoHelper.validationRules.required_document_type,
      //Domain: "url",
      ExternalDocumentId: "required|min:2",
      FileContent: "required|min:2",
      FileName: "required|min:2",
      //GetSocialSecurityNumber: "boolean",
      //HideDetailsPage: "boolean",
      IdentityProvider: syncanoHelper.validationRules.required_identityProvider,
      Language: syncanoHelper.validationRules.required_language,
      // MetaData: "",
      // Private: "boolean",
      // PushNotificationUrl: "url",
      ReturnUrlError: "required|url",
      ReturnUrlSuccess: "required|url",
      ReturnUrlUserAbort: "required|url",
      SigneeRefs: "required",
      Title: "required|min:2",
      //UrlExpiresMinutes: "number",
      //UseIframe: "boolean",
      //UseWebMessaging: "boolean",
  };

  if(ctx.args) {
      if(ctx.args.FileName && <string>ctx.args.DocumentType == "XML" && !ctx.args.XlstFileContent) {
          response.json({
              error: "XlstFileContent is required when signing an XML-document"
          });
      }
      if(!ctx.args.PushNotificationUrl && ctx.config.INSTANCE_URL) {
          ctx.args.PushNotificationUrl = ctx.config.INSTANCE_URL + "/endpoints/sockets/idfy-sign/callback/"
          +   "?DocumentId=[0]&Operation=[2]&ExternalDocumentId=[3]&SigneeRef=[4]&ExternalUniqueId=[5]";
      }
  }

  syncanoHelper.signereJsonResponse(
      (c, a) => c.ExternalSign_Create(a),
      validation
  );
}
