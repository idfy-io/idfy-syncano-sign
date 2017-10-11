import { assert } from 'chai';
import { testConfig } from './testconfig';
import { testPdf } from './testpdf';
import { run } from 'syncano-test';
import { it, describe } from 'mocha';

const util = require("util");

describe('create-document', function () {

  it('should-create-document', function (done) {
    run('document_create', {
      args: {
        Title: "Test document",
        Description: "This is a test document",
        DoNotNotifySigneeRefs: true,
        FileContent: testPdf.FileContent,
        FileMD5CheckSum: testPdf.FileMD5CheckSum,
        FileName: testPdf.FileName,
        ExternalDocumentId: "123",
        Language: "EN",
        SigneeRefs: [{
          FirstName: "TestFirstName",
          LastName: "TestLastName",
          ExternalSigneeId: "123",
          Mobile: "99999999",
          Email: "test@test.test"
        }],
        SignJobId: "2a5a9cce7931404c986ca808013b1ae6"

      }, config: testConfig
    }).then(r => {
      let signUrl = r.data.SigneeRefs[0].SignUrl;
      assert.isString(signUrl, "No sign url");
      console.log("Sign url is: " + signUrl)
      done();
    }).catch(err => {
    });
  })


})