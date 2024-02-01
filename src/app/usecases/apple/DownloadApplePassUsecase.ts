import { ApplePassRepository } from "../../repositories/apple/ApplePassRepository";
import { DownloadData } from "./data/DownloadData";
import path from "path";
import { PKPass } from "passkit-generator";
import { ApplePass } from "../../models/apple/ApplePass";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnhandledDataTypeError } from "../../errors/apple/UnhandledDataTypeError";
import { PassNotChangedError } from "../../errors/apple/PassNotChangedError";
import { PassService } from "../../services/apple/PassService";
import  PassJson  from "../../usecases/apple/passModels/boardingPassModel/.pass/pass.json";
import {string} from "joi";

export class DownloadApplePassUsecase {
  constructor(
    private applePassRepository: ApplePassRepository,
    private passService: PassService,
    private config
  ) {}

  async execute(
    data: DownloadData,
    throwIfNotModified = false
  ): Promise<PKPass> {
    const applePass = await this.applePassRepository.get(data.id);

    if (!applePass || applePass.token !== data.token) {
      throw new NotFoundError();
    }

    const lastUpdatedAtTime =
      applePass.lastUpdatedAt !== null ? applePass.lastUpdatedAt.getTime() : 0;

    if (throwIfNotModified && data.ifModifiedSince > lastUpdatedAtTime) {
      throw new PassNotChangedError();
    }

    switch (applePass.type) {
      case "boardingPass":
        return await this.boardingPass(applePass);
      default:
        throw new UnhandledDataTypeError(
          `Unhandled data type: ${applePass.type}`
        );
    }
  }

  async boardingPass(applePass: ApplePass): Promise<PKPass> {
    const certificates = await this.passService.getCertificates();

    const pkPass = await PKPass.from(
      {
        model:
          path.resolve("src/app/usecases/apple/passModels/boardingPassModel") +
          "/",
        certificates: certificates,
      },
      {
        serialNumber: applePass.id,
        passTypeIdentifier: this.config.applePass.passTypeIdentifier,
        teamIdentifier: this.config.applePass.teamIdentifier,
        webServiceURL: this.config.applePass.url,
        organizationName: this.config.applePass.organizationName,
        authenticationToken: applePass.token,
        voided: false,
        sharingProhibited: false,
      }
    );
    pkPass.localize('en', {PassJson})
    pkPass.primaryFields.push(
      {
        key: "from",
        label: "FromLabel",
        value: applePass.data.from.value,
        changeMessage: "Origin changed to %@.",
      },
      {
        key: "to",
        label: applePass.data.to.label,
        value: applePass.data.to.value,
        changeMessage: "Destination changed to %@.",
      }
    );

    pkPass.auxiliaryFields.push({
      key: "passenger",
        label: applePass.data.passenger.label,
      value: applePass.data.passenger.value,
      changeMessage: "Passenger changed to %@.",
    });

    pkPass.secondaryFields.push(
      {
        key: "time",
        label: applePass.data.time.label,
        value: applePass.data.time.value,
        changeMessage: "Time changed to %@.",
      },
      {
        key: "passengers",
        label: applePass.data.passengers.label,
        value: applePass.data.passengers.value,
        changeMessage: "Passengers changed to %@.",
      },
      {
        key: "payToDriver",
        label: applePass.data.payToDriver.label,
        value: applePass.data.payToDriver.value,
        changeMessage: "Pay To Driver changed to %@.",
      }
    );

    pkPass.setRelevantDate(applePass.expiredAt);
    pkPass.setExpirationDate(applePass.expiredAt);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pkPass.setBarcodes({
      format: "PKBarcodeFormatQR",
      message: applePass.barcodeMessage,
      messageEncoding: "utf-8",
      altText: "Scan me",
    });

    pkPass.backFields.push(
      {
        key: "passSourceUpdate",
        label: "update this pass",
        value: this.passService.getDownloadUrl(applePass.id, applePass.token),
      },
      {
        key: "passSourceSignature",
        label: `created by ${this.config.applePass.organizationName}`,
        value: "",
      }
    );

    return pkPass;
  }
}
