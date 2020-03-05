import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timeStamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timeStamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timeStamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timeStamp = timeStamp;
  }
}

const genesisBlock: Block = new Block(0, "20202020", "", "Hello", 123456);
// 새 block 생성

let blockChain: Block[] = [genesisBlock];
// blockchain은 block의 배열이므로 type은 Block의 배열로 지정

const getBlockchain = (): Block[] => blockChain;
// 단순히 blockchain을 return함

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
//마지막 block만 가져오는 것이므로 type을 Block으로 지정. blockchain이란 배열에서 마지막 object(block)를 가져온다.

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

export {};
