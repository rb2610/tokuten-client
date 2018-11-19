// import chai from "chai";
import * as mockttp from "mockttp";
import { NightwatchBrowser } from "nightwatch";

const mockServer = mockttp.getLocal();
// const expect = chai.expect;

const testHeaders = { "access-control-allow-origin": "*" };

module.exports = {
  Test: (client: NightwatchBrowser) => {
    client.url(client.launch_url).pause(500);
    client.expect.element("body").to.be.present;
    client.expect.element(".main-title").text.to.contain("Tokuten");
    client.end();
  },

  "Test Table Test": (client: NightwatchBrowser) => {
    mockServer.get("/api/scoreData").thenReply(
      200,
      JSON.stringify({
        data: [
          {
            id: 1,
            name: "Foo",
            wins: 5,
            played: 7
          },
          {
            id: 2,
            name: "Roo",
            wins: 2,
            played: 7
          }
        ]
      }),
      testHeaders
    );

    client.url(client.launch_url).pause(500);
    client.expect.element(".test-table").to.be.present;
    client.expect.element(".tt-name-0").text.to.equal("Foo");
    client.expect.element(".tt-wins-0").text.to.equal("5");
    client.expect.element(".tt-played-0").text.to.equal("7");
    client.expect.element(".tt-name-1").text.to.equal("Roo");
    client.expect.element(".tt-wins-1").text.to.equal("2");
    client.expect.element(".tt-played-1").text.to.equal("7");
    client.end();
  },

  "Add Player Test": async (client: NightwatchBrowser) => {
    mockServer.get("/api/scoreData").thenReply(
      200,
      JSON.stringify({
        data: [
          {
            id: 1,
            name: "Foo",
            wins: 5,
            played: 7
          },
          {
            id: 2,
            name: "Roo",
            wins: 2,
            played: 7
          }
        ]
      }),
      testHeaders
    );
    // mockServer.options("/api/scoreData").thenReply()
    const requestMock = await mockServer.post("/api/scoreData").thenReply(
      200,
      JSON.stringify({
        data: [
          {
            id: 3,
            name: "Bob",
            wins: 0,
            played: 0
          }
        ]
      }),
      testHeaders
    );
    /*mockServer.get("/api/scoreData").once().thenReply(
      200,
      JSON.stringify({
        data: [
          {
            id: 1,
            name: "Foo",
            wins: 5
          },
          {
            id: 2,
            name: "Roo",
            wins: 2
          },
          {
            id: 3,
            name: "Bob",
            wins: 0
          }
        ]
      }),
      testHeaders
    );*/

    client.url(client.launch_url).pause(500);
    client.setValue("#new-player-name-field", "Bob");
    client.click("#new-player-submit");
    client.expect.element(".test-table").to.be.present;
    /*client.expect.element(".tt-name-0").text.to.equal("Foo");
    client.expect.element(".tt-wins-0").text.to.equal("5");
    client.expect.element(".tt-name-1").text.to.equal("Roo");
    client.expect.element(".tt-wins-1").text.to.equal("2");
    client.expect.element(".tt-name-2").text.to.equal("Bob");
    client.expect.element(".tt-wins-2").text.to.equal("0");*/
    client.end();
    const requests = await requestMock.getSeenRequests();
    // tslint:disable-next-line:no-console
    console.log("Request:");
    // tslint:disable-next-line:no-console
    console.log(requests);
    // expect(requests.pop().body.json).to.deep.equal({});
  },

  beforeEach: (browser: any) => {
    mockServer.start(3001);
  },

  afterEach: (browser: any) => {
    mockServer.stop();
  }
};

//mock-http-server
