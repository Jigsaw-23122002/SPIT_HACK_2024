import {
  buyEvent as buyEventEvent,
  mintEvent as mintEventEvent,
  putTokenOnSaleEvent as putTokenOnSaleEventEvent,
  transferEtherEvent as transferEtherEventEvent
} from "../generated/MyArtsContract/MyArtsContract"
import {
  buyEvent,
  mintEvent,
  putTokenOnSaleEvent,
  transferEtherEvent
} from "../generated/schema"

export function handlebuyEvent(event: buyEventEvent): void {
  let entity = new buyEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0
  entity.param1 = event.params.param1
  entity.param2 = event.params.param2
  entity.param3 = event.params.param3

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlemintEvent(event: mintEventEvent): void {
  let entity = new mintEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0
  entity.param1 = event.params.param1
  entity.param2 = event.params.param2
  entity.param3 = event.params.param3

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleputTokenOnSaleEvent(
  event: putTokenOnSaleEventEvent
): void {
  let entity = new putTokenOnSaleEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0
  entity.param1 = event.params.param1
  entity.param2 = event.params.param2

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handletransferEtherEvent(event: transferEtherEventEvent): void {
  let entity = new transferEtherEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param0 = event.params.param0
  entity.param1 = event.params.param1
  entity.param2 = event.params.param2

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
