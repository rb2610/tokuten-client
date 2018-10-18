import { NightwatchBrowser } from "nightwatch";

module.exports = {
  'Test': (client : NightwatchBrowser) => {
    client.url(client.launch_url).pause(500);
    client.expect.element("body").to.be.present;
    client.expect.element(".main-title").text.to.contain("Tokuten");
    client.end();
  },

  'Test Table Test': (client: NightwatchBrowser) => {
    client.url(client.launch_url).pause(500);
    client.expect.element(".main-title").text.to.contain("Tokuten");
    // client.expect.element("#test-table").to.be.present;
    client.end();
  }
};

//mock-http-server