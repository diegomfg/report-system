const request = require("supertest");
const expect = require("expect");
const app = require("../../app.js").app;

describe("Auth Test #1", () => {
    describe("GET /dashboard", () => {
        it("Should return 302 as response code", (done) => {
            request(app)
                .get("/user/dashboard")
                .expect(302)
                .end(done);

        })
    })
});