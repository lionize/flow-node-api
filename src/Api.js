// @flow

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

export default class Api {
  express: express$Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  middleware(): void {
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  routes(): void {
    this.express.use((req: $Request, res: $Response) => {
      res.json({ message: "Hello Flow!" });
    });
  }
}
