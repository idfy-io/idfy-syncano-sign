import { SyncanoHelper } from './../utils/SyncanoHelper';
const { response } = require('syncano-server');

const validation = {
    //AddonServices: "array",
    //ConvertToPDFA2b: "boolean",
    //CreatedByApplication: "min:2",
    //CreatePADES: "boolean",
    Description: "required|min:2",
    DocumentType: SyncanoHelper.validationRules.required_document_type,
    //Domain: "url",
    ExternalDocumentId: "required|min:2",
    FileContent: "required|min:2",
    FileName: "required|min:2",
    //GetSocialSecurityNumber: "boolean",
    //HideDetailsPage: "boolean",
    IdentityProvider: SyncanoHelper.validationRules.required_identityProvider,
    Language: SyncanoHelper.validationRules.required_language,
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

if(SyncanoHelper.args) {
    if(SyncanoHelper.args.FileName && <string>SyncanoHelper.args.DocumentType == "XML" && !SyncanoHelper.args.XlstFileContent) {
        response.json({
            error: "XlstFileContent is required when signing an XML-document"
        });
    }
    if(!SyncanoHelper.args.PushNotificationUrl && SyncanoHelper.config.INSTANCE_URL) {
        SyncanoHelper.args.PushNotificationUrl = SyncanoHelper.config.INSTANCE_URL + "/endpoints/sockets/idfy-sign/callback/"
        +   "?DocumentId=[0]&Operation=[2]&ExternalDocumentId=[3]&SigneeRef=[4]&ExternalUniqueId=[5]";
    }
}

SyncanoHelper.signereJsonResponse(
    (c, a) => c.ExternalSign_Create(a),
    validation
);