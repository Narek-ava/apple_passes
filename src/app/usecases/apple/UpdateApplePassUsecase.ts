import { generateToken } from "../../models/common";
import { ApplePassValidator } from "../../services/validators/ApplePassValidator";
import { ApplePass } from "../../models/apple/ApplePass";
import { ApplePassRepository } from "../../repositories/apple/ApplePassRepository";
import { UpdateData } from "./data/UpdateData";
import { SubscribedDeviceRepository } from "../../repositories/apple/SubscribedDeviceRepository";
import { SubscribedDeviceFilter } from "../../repositories/filters/apple/SubscribedDeviceFilter";
import { Pagination } from "../../repositories/Pagination";
import * as apn from "apn";
import { ProviderOptions } from "apn";
import { ApplePassFilter } from "../../repositories/filters/apple/ApplePassFilter";
import { NotFoundError } from "../../errors/NotFoundError";

export class UpdateApplePassUsecase {
  constructor(
    private validator: ApplePassValidator,
    private applePassRepository: ApplePassRepository,
    private subscribedDeviceRepository: SubscribedDeviceRepository,
    private config
  ) {}

  async execute(id: string, data: UpdateData): Promise<ApplePass> {
    const searchFilter: ApplePassFilter = {
      ids: [id],
    };

    const searchResult = await this.applePassRepository.search(
      searchFilter,
      Pagination.createSingleResult()
    );

    if (searchResult.results.length === 0) {
      throw new NotFoundError();
    }

    const applePass: ApplePass = searchResult.results[0];

    const updateData: ApplePass = {
      id: id,
      expiredAt: data.expiredAt,
      token: applePass.token,
      barcodeMessage: data.barcodeMessage,
      type: data.type,
      data: data.data,
      lastUpdatedAt: new Date(),
    };

    const validationError = this.validator.validate(updateData);

    if (validationError !== undefined) {
      throw validationError;
    }

    await this.applePassRepository.update(updateData);

    const subscribedDevicesFilter: SubscribedDeviceFilter = {
      passIds: [applePass.id],
    };

    const devicesToBeNotified = await this.subscribedDeviceRepository.search(
      subscribedDevicesFilter,
      Pagination.createUnlimited()
    );

    devicesToBeNotified.results.map((deviceToBeNotified) => {
      //todo add job
      this.notify(deviceToBeNotified.pushToken);
    });

    return updateData;
  }

  async notify(deviceToken: string) {
    const options: ProviderOptions = {
      token: {
        key: Buffer.from(this.config.applePass.authKey, "base64").toString(
          "utf-8"
        ),
        keyId: this.config.applePass.apnKeyId,
        teamId: this.config.applePass.apnTeamId,
      },
      production: true,
    };

    const apnProvider = new apn.Provider(options);

    const note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "You have a new message";
    note.topic = this.config.applePass.passTypeIdentifier;

    await apnProvider.send(note, deviceToken);
  }
}
