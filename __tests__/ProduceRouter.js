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

  describe("GET /api/v1/produce/:id - get produce item by id", () => {
    it("should return an obj of type Produce", () => {
      return request(app)
        .get("/api/v1/produce/1")
        .expect(200)
        .then(res => {
          const reqKeys = ["id", "name", "price", "quantity"];
          const { item } = res.body;
          reqKeys.forEach(key => {
            expect(Object.keys(item)).toContain(key);
          });
          expect(typeof item.id).toBe("number");
          expect(typeof item.name).toBe("string");
          expect(typeof item.quantity).toBe("number");
          expect(typeof item.price).toBe("number");
        });
    });

    it("should return a Produce w/ requested id", () => {
      return request(app)
        .get("/api/v1/produce/1")
        .expect(200)
        .then(res => {
          expect(res.body.item).toEqual({
            id: 1,
            name: "banana",
            quantity: 15,
            price: 1
          });
        });
    });

    it("should 400 on a request for a nonexistant id", () => {
      return Promise.all([
        request(app)
          .get("/api/v1/produce/-32")
          .expect(400)
          .then(res => {
            expect(res.body.message).toBe("No item found with id: -32");
          }),
        request(app)
          .get("/api/v1/produce/99999")
          .expect(400)
          .then(res => {
            expect(res.body.message).toBe("No item found with id: 99999");
          })
      ]);
    });
  });
});
