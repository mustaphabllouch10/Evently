import type { Request, Response } from "express";

export class HelloController {
  async index(req: Request, res: Response) {
    res.json({
      message: "Get all hellos",
    });
  }

  async show(req: Request, res: Response) {
    res.json({
      message: "Get hello",
      id: req.params.id,
    });
  }

  async create(req: Request, res: Response) {
    res.json({
      message: "Create hello",
    });
  }

  async update(req: Request, res: Response) {
    res.json({
      message: "Update hello",
      id: req.params.id,
    });
  }

  async destroy(req: Request, res: Response) {
    res.json({
      message: "Delete hello",
      id: req.params.id,
    });
  }
}