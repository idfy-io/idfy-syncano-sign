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
      //DoNotNotifySigneeRefs: "boolean",
      ExternalDocumentId: "required|min:2",
      FileContent: "required|min:2",
      FileMD5CheckSum: "required|min:2",
      FileName: "required|min:2",
      //GetSSN: "boolean",
      Language: syncanoHelper.validationRules.required_language,
      //MessageEmail: "min:2",
      //MessageSms: "min:2",
      //MetaData: "array",
      //NotifySenderWhenCanceledEmail: "boolean",
      //NotifySenderWhenCanceledSMS: "boolean",
      //NotifySenderWhenSignedEmail: "boolean",
      //NotifySenderWhenSignedSMS: "boolean",
      //NotifySigneerefBeforeSignDeadlineEmail: "boolean",
      //NotifySigneerefBeforeSignDeadlineSMS: "boolean",
      //NotifySigneerefsWhenSignedEmail: "boolean",
      //NotifySigneerefsWhenSignedSMS: "boolean",
      //Private: "boolean",
      //PushNotificationUrl: "min:2",
      //ReceiptMessageEmail: "min:2",
      //ReceiptTopicEmail: "min:2",
      //RedirectFinishUrl: "min:2",
      //SenderEmail: "email",
      //SenderMobile: "min:8",
      //ShowOnSigneesPersonalSite: "boolean",
      //SignDeadline: "date",
      SigneeRefs: "required",
      SignJobId: syncanoHelper.validationRules.required_guid,
      Title: "required|min:2",
      //TopicEmail: "min:2",
      //XlstFileContent: "min:2",
  };

  if(ctx.args) {
      if(ctx.args.FileName && (<string>ctx.args.FileName).toLowerCase().endsWith(".xml") && !ctx.args.XlstFileContent) {
          response.json({
              error: "XlstFileContent is required when signing an XML-document"
          });
      }
      if(!ctx.args.PushNotificationUrl && ctx.config.INSTANCE_URL) {
          ctx.args.PushNotificationUrl = ctx.config.INSTANCE_URL + "/endpoints/sockets/idfy-sign/callback/"
              +   "?DocumentId=[0]&Operation=[2]&ExternalDocumentId=[3]&SigneeRef=[4]";
      }
  }

  syncanoHelper.signereJsonResponse(
      (c, a) => c.Document_Create(a),
      validation
  );
}
