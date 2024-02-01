import { promises as fs } from "node:fs";
import path from "path";

export class PassService {
  constructor(protected config) {
    this.config = config;
  }

  getDownloadUrl(id: string, token?: string) {
    const query = token ? `?token=${token}` : "";

    return `${this.config.applePass.url}/v1/passes/${this.config.applePass.passTypeIdentifier}/${id}${query}`;
  }

  async getCertificates(): Promise<{
    signerCert: string | Buffer;
    signerKey: string | Buffer;
    wwdr: string | Buffer;
    signerKeyPassphrase?: string;
  }> {
    const wwdr = await fs.readFile(
      path.resolve(
        "src/app/usecases/apple/passModels",
        "certificates",
        "wwdr.pem"
      ),
      "utf-8"
    );

    //todo make type
    return {
      signerCert: Buffer.from(
        this.config.applePass.signerCert,
        "base64"
      ).toString("utf-8"),
      signerKey: Buffer.from(
        this.config.applePass.signerKey,
        "base64"
      ).toString("utf-8"),
      wwdr,
      signerKeyPassphrase: this.config.applePass.signerKeyPassphrase,
    };
  }
}
