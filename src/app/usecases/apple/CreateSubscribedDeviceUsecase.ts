import { GenerateUniqueIdFunction } from "../../models/common";
import { CreateSubscribedDevice } from "./data/CreateSubscribedDevice";
import { SubscribedDeviceRepository } from "../../repositories/apple/SubscribedDeviceRepository";
import { SubscribedDevice } from "../../models/apple/SubscribedDevice";
import { ApplePassRepository } from "../../repositories/apple/ApplePassRepository";
import { NotFoundError } from "../../errors/NotFoundError";
import { SubscribedDeviceFilter } from "../../repositories/filters/apple/SubscribedDeviceFilter";
import { Pagination } from "../../repositories/Pagination";

export class CreateSubscribedDeviceUsecase {
  constructor(
    private generateUniqueId: GenerateUniqueIdFunction,
    private subscribedDeviceRepository: SubscribedDeviceRepository,
    private applePassRepository: ApplePassRepository
  ) {}

  async execute(data: CreateSubscribedDevice, token: string): Promise<void> {
    const applePass = await this.applePassRepository.get(data.passId);

    if (!applePass || applePass.token !== token) {
      throw new NotFoundError();
    }

    const subscribedDeviceFilter: SubscribedDeviceFilter = {
      deviceLibraryIdentifiers: [data.deviceLibraryIdentifier],
      passIds: [data.passId],
      pushTokens: [data.pushToken],
    };

    const subscribedDevice = await this.subscribedDeviceRepository.search(
      subscribedDeviceFilter,
      Pagination.createSingleResult()
    );

    if (subscribedDevice.results.length === 0) {
      const newSubscribedDevice: SubscribedDevice = {
        id: this.generateUniqueId(),
        passId: data.passId,
        pushToken: data.pushToken,
        deviceLibraryIdentifier: data.deviceLibraryIdentifier,
      };

      await this.subscribedDeviceRepository.create(newSubscribedDevice);
    }
  }
}
