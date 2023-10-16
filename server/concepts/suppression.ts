import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface SuppressionDoc extends BaseDoc {
  suppressor: ObjectId;
  suppressee: ObjectId;
}

export default class SuppressionConcept {
  public readonly suppressions = new DocCollection<SuppressionDoc>("suppressions");

  async getSuppressedUsers(user: ObjectId) {
    return await this.suppressions.readMany({ suppressor: user });
  }

  async add(suppressor: ObjectId, suppressee: ObjectId) {
    await this.canSuppress(suppressor, suppressee);
    await this.suppressions.createOne({ suppressor, suppressee });
    return { msg: "Suppressed user!" };
  }

  async remove(suppressor: ObjectId, suppressee: ObjectId) {
    await this.canUnsuppress(suppressor, suppressee);
    await this.suppressions.popOne({ suppressor, suppressee });
    this.suppressions.deleteOne({ suppressor, suppressee});
    return { msg: "Unsuppressed user!"};
  }

  private async canSuppress(suppressor: ObjectId, suppressee: ObjectId) {
    const suppression = await this.suppressions.readOne({ suppressor, suppressee });
    if (suppression !== null) {
      throw new AlreadySuppressedError(suppressor, suppressee);
    }
  }

  private async canUnsuppress(suppressor: ObjectId, suppressee: ObjectId) {
    const suppression = await this.suppressions.readOne({ suppressor, suppressee });
    if (suppression === null) {
      throw new SuppressionNotFoundError(suppressor, suppressee);
    }
  }
}

export class SuppressionNotFoundError extends NotFoundError {
    constructor(
      public readonly suppressor: ObjectId,
      public readonly suppressee: ObjectId,
    ) {
      super("{0} has not suppressed {1}!", suppressor, suppressee);
    }
  }
  
  export class AlreadySuppressedError extends NotAllowedError {
    constructor(
      public readonly suppressor: ObjectId,
      public readonly suppressee: ObjectId,
    ) {
      super("{0} has already suppressed {1}!", suppressor, suppressee);
    }
  }