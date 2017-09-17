const { events } = require("syncano-server");
import { SyncanoHelper } from './../utils/SyncanoHelper';

events.emit('document_signed', SyncanoHelper.args);