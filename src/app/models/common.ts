import { Moment } from "moment";
import uuid4 from "uuid4";
import moment from "moment/moment";
import crypto from "crypto";

export type UniqueId = string;
export type GenerateUniqueIdFunction = () => UniqueId;
export const defaultGenerateUniqueId = () => uuid4();
export const generateToken = (): string =>
  crypto.randomBytes(20).toString("hex");

export type GetCurrentTimeFunction = () => Moment;
export const defaultGetCurrentTime = () => moment.utc();

export type Email = string;
export type DateTime = string;
export type PhoneNumber = string;

export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type OptionalNullable<T> = Optional<Nullable<T>>;

export type Locale = "en" | "ru";
export type Translation = {
  [key in Locale]?: string;
};
