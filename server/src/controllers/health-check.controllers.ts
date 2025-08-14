import type { NextFunction, Response, Request } from "express";

function healthCheck(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ message: "server is running" });
}

export default { healthCheck };
