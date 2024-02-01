import { UniqueId } from "../common";
export interface SubscribedDevice {
  id: UniqueId;
  passId: string;
  pushToken: string;
  deviceLibraryIdentifier: string;
}
