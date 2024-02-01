import { GenerateUniqueIdFunction, generateToken } from "../../models/common";
import { ApplePassValidator } from "../../services/validators/ApplePassValidator";
import { ApplePass } from "../../models/apple/ApplePass";
import { CreateData } from "./data/CreateData";
import { ApplePassRepository } from "../../repositories/apple/ApplePassRepository";
import { ApplePassFilter } from "../../repositories/filters/apple/ApplePassFilter";
import { Pagination } from "../../repositories/Pagination";
import { ValidationError } from "../../errors/ValidationError";

export class CreateApplePassUsecase {
  constructor(
    private validator: ApplePassValidator,
    private generateUniqueId: GenerateUniqueIdFunction,
    private applePassRepository: ApplePassRepository
  ) {}

  async execute(
    data: CreateData,
    id: string | undefined = undefined
  ): Promise<ApplePass> {
    const applePass: ApplePass = {
      id: id ?? this.generateUniqueId(),
      expiredAt: data.expiredAt,
      token: generateToken(),
      barcodeMessage: data.barcodeMessage,
      type: data.type,
      data: data.data,
      lastUpdatedAt: null,
    };

    const validationError = this.validator.validate(applePass);

    if (validationError !== undefined) {
      throw validationError;
    }

    if (id) {
      const searchFilter: ApplePassFilter = {
        ids: [id],
      };

      const pass = await this.applePassRepository.search(
        searchFilter,
        Pagination.createSingleResult()
      );

      if (pass.results.length > 0) {
        throw new ValidationError("422", `Id: ${id} already exists`, "id");
      }
    }

    await this.applePassRepository.create(applePass);

    return applePass;
  }
}
