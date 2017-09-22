import request from "supertest-as-promised";
import Api from "../src/Api";

const app = new Api().express;

describe("Flow API", () => {
  it("hello test", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(res => {
        expect(typeof res.body.message).toBe("string");
        expect(res.body.message).toBe("Hello Flow!");
      });
  });
});
