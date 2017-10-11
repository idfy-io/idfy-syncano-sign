
import { assert } from 'chai'
import { run } from 'syncano-test'
import { testConfig } from './testconfig';
import { testPdf } from './testpdf';

declare const it: any;
declare const describe: any;

describe('create-documentjob', function () {
    
    let jobId = "";

    it('should-create-documentjob', function (done) {
        const args = {
            Contact_Email: "test@test.test",
            Contact_Phone: "44444444",
            Contact_Name: "John Doe",
            Contact_Mobile: "99999999",
            Contact_Url: "https://idfy.io",
        };
        run('documentjob_create', {
            args: args, config: testConfig
        }).then(r => {
            assert.isString(r.data, "Response was not string");
            jobId = r.data;
            return run('documentjob_get', { args: { 'JobId': jobId }, config: testConfig });
        }).then(r => {
            assert.propertyVal(r.data, 'Id', jobId);
            assert.propertyVal(r.data, 'Contact_Name', args.Contact_Name);
            done();
        });
    })
})