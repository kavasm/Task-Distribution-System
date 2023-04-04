import { IQueue } from './IQueue';

class Queue implements IQueue<Number> {
  public static getInstance(): Queue {
    if (!Queue.instance) {
      Queue.instance = new Queue();
    }
    return Queue.instance;
  }
  private static instance: Queue;

  private storage: number[] = [];

  constructor(private capacity: number = Infinity) { }

  enqueue(item: number): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }
  dequeue(): number | undefined {
    return this.storage.shift();
  }
  size(): number {
    return this.storage.length;
  }
}

export default Queue.getInstance();
