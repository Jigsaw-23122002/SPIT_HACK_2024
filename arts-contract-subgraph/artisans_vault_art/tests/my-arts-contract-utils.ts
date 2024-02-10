import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  buyEvent,
  mintEvent,
  putTokenOnSaleEvent,
  transferEtherEvent
} from "../generated/MyArtsContract/MyArtsContract"

export function createbuyEventEvent(
  param0: Address,
  param1: Address,
  param2: BigInt,
  param3: BigInt
): buyEvent {
  let buyEventEvent = changetype<buyEvent>(newMockEvent())

  buyEventEvent.parameters = new Array()

  buyEventEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  buyEventEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromAddress(param1))
  )
  buyEventEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromUnsignedBigInt(param2))
  )
  buyEventEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromUnsignedBigInt(param3))
  )

  return buyEventEvent
}

export function createmintEventEvent(
  param0: Address,
  param1: BigInt,
  param2: string,
  param3: BigInt
): mintEvent {
  let mintEventEvent = changetype<mintEvent>(newMockEvent())

  mintEventEvent.parameters = new Array()

  mintEventEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  mintEventEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromUnsignedBigInt(param1))
  )
  mintEventEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromString(param2))
  )
  mintEventEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromUnsignedBigInt(param3))
  )

  return mintEventEvent
}

export function createputTokenOnSaleEventEvent(
  param0: BigInt,
  param1: boolean,
  param2: BigInt
): putTokenOnSaleEvent {
  let putTokenOnSaleEventEvent = changetype<putTokenOnSaleEvent>(newMockEvent())

  putTokenOnSaleEventEvent.parameters = new Array()

  putTokenOnSaleEventEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromUnsignedBigInt(param0))
  )
  putTokenOnSaleEventEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromBoolean(param1))
  )
  putTokenOnSaleEventEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromUnsignedBigInt(param2))
  )

  return putTokenOnSaleEventEvent
}

export function createtransferEtherEventEvent(
  param0: Address,
  param1: Address,
  param2: BigInt
): transferEtherEvent {
  let transferEtherEventEvent = changetype<transferEtherEvent>(newMockEvent())

  transferEtherEventEvent.parameters = new Array()

  transferEtherEventEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  transferEtherEventEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromAddress(param1))
  )
  transferEtherEventEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromUnsignedBigInt(param2))
  )

  return transferEtherEventEvent
}
