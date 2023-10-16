import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface BlockDoc extends BaseDoc {
  blocker: ObjectId;
  blockee: ObjectId;
}

export default class BlockConcept {
  public readonly blocks = new DocCollection<BlockDoc>("blocks");

  async getBlockedUsers(user: ObjectId) {
    return await this.blocks.readMany({ blocker: user });
  }

  async add(blocker: ObjectId, blockee: ObjectId) {
    await this.canBlock(blocker, blockee);
    await this.blocks.createOne({ blocker, blockee });
    return { msg: "Blocked user!" };
  }

  async remove(blocker: ObjectId, blockee: ObjectId) {
    await this.canUnblock(blocker, blockee);
    const block = await this.blocks.popOne({ blocker, blockee });
    this.blocks.deleteOne({ blocker, blockee});
    return { msg: "Unblocked user!"};
  }

  private async canBlock(blocker: ObjectId, blockee: ObjectId) {
    const block = await this.blocks.readOne({ blocker, blockee });
    if (block !== null) {
      throw new AlreadyBlockedError(blocker, blockee);
    }
  }

  private async canUnblock(blocker: ObjectId, blockee: ObjectId) {
    const block = await this.blocks.readOne({ blocker, blockee });
    if (block === null) {
      throw new BlockNotFoundError(blocker, blockee);
    }
  }
}

export class BlockNotFoundError extends NotFoundError {
    constructor(
      public readonly blocker: ObjectId,
      public readonly blockee: ObjectId,
    ) {
      super("{0} has not blocked {1}!", blocker, blockee);
    }
  }
  
  export class AlreadyBlockedError extends NotAllowedError {
    constructor(
      public readonly blocker: ObjectId,
      public readonly blockee: ObjectId,
    ) {
      super("{0} has already blocked {1}!", blocker, blockee);
    }
  }