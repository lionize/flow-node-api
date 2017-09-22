// @ flow

import inventory from "../../data/produce";
import { Router } from "express";

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

  init(): void {
    this.router.get("/", this.getAll);
  }
}
