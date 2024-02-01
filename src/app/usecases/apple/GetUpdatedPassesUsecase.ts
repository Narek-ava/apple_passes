import { SubscribedDeviceRepository } from "../../repositories/apple/SubscribedDeviceRepository";
import { ApplePassRepository } from "../../repositories/apple/ApplePassRepository";
import { SubscribedDeviceFilter } from "../../repositories/filters/apple/SubscribedDeviceFilter";
import { Pagination } from "../../repositories/Pagination";
import { ApplePassFilter } from "../../repositories/filters/apple/ApplePassFilter";

export class GetUpdatedPassesUsecase {
  constructor(
    private subscribedDeviceRepository: SubscribedDeviceRepository,
    private applePassRepository: ApplePassRepository
  ) {}

  async execute(
    deviceLibraryIdentifier: string,
    lastUpdatedAt: number
  ): Promise<string[]> {
    const subscribedDevicesFilter: SubscribedDeviceFilter = {
      deviceLibraryIdentifiers: [deviceLibraryIdentifier],
    };

    const subscribedDevices = await this.subscribedDeviceRepository.search(
      subscribedDevicesFilter,
      Pagination.createUnlimited()
    );

    const passIds = subscribedDevices.results.map((subscribedDevice) => {
      return subscribedDevice.passId;
    });

    const passFilter: ApplePassFilter = {
      ids: passIds,
      lastUpdatedAt: new Date(lastUpdatedAt),
    };

    const updatedPasses = await this.applePassRepository.search(
      passFilter,
      Pagination.createUnlimited()
    );

    return updatedPasses.results.map((updatedPass) => {
      return updatedPass.id;
    });
  }
}
