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
    client.expect.element(".test-table").to.be.present;
    client.expect.element(".tt-name-0").text.to.equal("Foo");
    client.expect.element(".tt-wins-0").text.to.equal("5");
    client.expect.element(".tt-name-1").text.to.equal("Roo");
    client.expect.element(".tt-wins-1").text.to.equal("2");
    client.end();
  }
};

//mock-http-server