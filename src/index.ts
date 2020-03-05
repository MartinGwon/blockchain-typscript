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

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timeStamp === "number" &&
    typeof aBlock.data === "string";

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

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timeStamp,
    aBlock.data
  );

const isBlockVaild = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false; //우선 Block이 유효한 구조를 가지고 있는지 판단합니다.
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false; // 인덱스 값이 정상적인지 확인합니다.
  } else if (previousBlock.hash !== candidateBlock.hash) {
    return false; // 전 block과 hash 값이 같은지 확인합니다.
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false; // hash 값이 정상적인지 확인합니다.
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockVaild(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockChain);

export {};
