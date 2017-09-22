import request from "supertest-as-promised";
import Api from "../src/Api";

const app = new Api().express;

describe("Flow API", () => {
  describe("GET /api/v1/produce - get all produce", () => {
    let expectedProps = ["id", "name", "quantity", "price"];

    it("should return JSON array", () => {
      return request(app)
        .get("/api/v1/produce")
        .expect(200)
        .then(res => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });

    it("should return objs w/ correct props", () => {
      return request(app)
        .get("/api/v1/produce")
        .expect(200)
        .then(res => {
          let sampleKeys = Object.keys(res.body[0]);
          expectedProps.forEach(key => {
            expect(sampleKeys.includes(key)).toBe(true);
          });
        });
    });

    it("shouldn't return objs w/ extra props", () => {
      return request(app)
        .get("/api/v1/produce")
        .expect(200)
        .then(res => {
          let extraProps = Object.keys(res.body[0]).filter(key => {
            return !expectedProps.includes(key);
          });
          expect(extraProps.length).toBe(0);
        });
    });
  });
});
