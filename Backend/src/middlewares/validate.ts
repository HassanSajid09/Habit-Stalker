import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import { ZodTypeAny } from "zod";

export const validate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.errors ?? err });
    }
  };
