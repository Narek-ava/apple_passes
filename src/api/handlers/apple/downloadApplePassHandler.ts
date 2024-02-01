import { Request, RequestHandler, Response } from "express";
import { DownloadData } from "../../../app/usecases/apple/data/DownloadData";
import { DownloadApplePassUsecase } from "../../../app/usecases/apple/DownloadApplePassUsecase";
import { PassNotChangedError } from "../../../app/errors/apple/PassNotChangedError";

export function downloadApplePassHandler(
  downloadApplePassUsecase: DownloadApplePassUsecase
): RequestHandler {
  return async (req: Request, res: Response) => {
    const ifModifiedSince = req.headers["if-modified-since"];

    const ifModifiedSinceTime = ifModifiedSince
      ? Date.parse(ifModifiedSince)
      : 0;

    const downloadData: DownloadData = {
      passTypeIdentifier: req.params.passTypeIdentifier,
      id: req.params.id,
      token:
        <string>req.query.token ??
        req.headers.authorization?.replace("ApplePass ", "") ??
        "",
      ifModifiedSince: ifModifiedSinceTime,
    };

    try {
      const pkPass = await downloadApplePassUsecase.execute(downloadData);
      const stream = pkPass.getAsStream();

      res.set({
        "Content-type": pkPass.mimeType,
        "Content-disposition": `attachment; filename=pass.pkpass`,
        "last-modified": Date.now(),
      });

      stream.pipe(res);
    } catch (error) {
      if (error instanceof PassNotChangedError) {
        // Handle the custom error
        res.status(200).json({});
      } else {
        throw error;
      }
    }
  };
}
