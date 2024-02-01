import { SubscribedDeviceRepository } from "../../repositories/apple/SubscribedDeviceRepository";
import { ApplePassRepository } from "../../repositories/apple/ApplePassRepository";
import { NotFoundError } from "../../errors/NotFoundError";
import { UniqueId } from "../../models/common";
import { SubscribedDeviceFilter } from "../../repositories/filters/apple/SubscribedDeviceFilter";
import { Pagination } from "../../repositories/Pagination";

export class DeleteSubscribedDeviceUsecase {
  constructor(
    private subscribedDeviceRepository: SubscribedDeviceRepository,
    private applePassRepository: ApplePassRepository
  ) {}

  async execute(
    passId: UniqueId,
    deviceLibraryIdentifier: string,
    token: string
  ): Promise<void> {
    const applePass = await this.applePassRepository.get(passId);

    if (!applePass || applePass.token !== token) {
      throw new NotFoundError();
    }

    const subscribedDeviceFilter: SubscribedDeviceFilter = {
      deviceLibraryIdentifiers: [deviceLibraryIdentifier],
      passIds: [passId],
    };
    const subscribedDevices = await this.subscribedDeviceRepository.search(
      subscribedDeviceFilter,
      Pagination.createUnlimited()
    );

    subscribedDevices.results.map(async (subscribedDevice) => {
      await this.subscribedDeviceRepository.delete(subscribedDevice.id);
    });
  }
}
