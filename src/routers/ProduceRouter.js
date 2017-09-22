// @flow

import { Router } from "express";
import inventory from "../../data/produce";
import saveInventory, { genId } from "../util/save";
import { parseProduce } from "../util/parsers";

export default class ProduceRouter {
  router: Router;
  path: string;

  constructor(path = "/api/v1/produce") {
    this.router = Router();
    this.path = path;
    this.init();
  }

  getAll(req: $Request, res: $Response): void {
    res.status(200).json(inventory);
  }

  getById(req: $Request, res: $Response): void {
    const id = parseInt(req.params.id, 10);
    const record = inventory.find(item => item.id === id);
    if (record) {
      res.status(200).json({
        message: "Success!",
        item: record
      });
    } else {
      res.status(400).json({
        status: res.status,
        message: `No item found with id: ${id}`
      });
    }
  }

  postOne(req: $Request, res: $Response): void {
    const received: Produce | boolean = parseProduce(req.body);
    const newProduce = received ? req.body : null;
    if (received) {
      newProduce.id = genId(received, inventory);
      inventory.push(newProduce);
      res.status(200).json({
        status: 200,
        message: "Success!",
        item: newProduce
      });
      saveInventory(inventory)
        .then(writePath => {
          logger(
            `Inventory updated. Written to:\n\t${path.relative(
              path.join(__dirname, "..", ".."),
              writePath
            )}`
          );
        })
        .catch(err => {
          logger("Error writing to inventory file.");
          logger(err.stack);
        });
    } else {
      res.status(400).json({
        status: 400,
        message:
          "Bad Request. Make sure that you submit an item with a name, quantity, and price."
      });
      logger("Malformed POST to /produce.");
    }
  }

  init(): void {
    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getById);
    this.router.post("/", this.postOne);
  }
}
