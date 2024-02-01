import { UniqueId } from "../../../models/common";

export type SubscribedDeviceFilter = {
  ids?: UniqueId[];
  deviceLibraryIdentifiers?: UniqueId[];
  passIds?: UniqueId[];
  pushTokens?: UniqueId[];
};
