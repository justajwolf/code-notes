import { ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { RoomRegistry } from '../room-registry';
import { BaseCommand } from '../cmd/base.command';

export abstract class BaseHandler implements ICommandHandler {
  @Inject(EventBus) protected readonly eventBus: EventBus;
  @Inject(RoomRegistry) protected readonly registry: RoomRegistry;

  protected abstract handle(command: BaseCommand);
  async execute(command: BaseCommand): Promise<any> {
    return this.handle(command);
  }
}