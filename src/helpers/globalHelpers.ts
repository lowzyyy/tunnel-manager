import { Response } from "express";

export const startPort = 3193;

export const extractAuthToken = (bearerString: string | undefined) => {
  const substr = bearerString
    ? bearerString.substring("Bearer ".length)
    : undefined;
  return substr !== "undefined" ? substr : undefined;
};

export const processError = (error: any, res: Response, data?: null) => {
  if (data === undefined)
    return res.status(error.code || 404).json({ message: error.message });
  else
    return res
      .status(error.code || 404)
      .json({ data: null, message: error.message });
};
