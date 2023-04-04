export interface IQueue<Number> {
  enqueue(item: number): void;
  dequeue(): number | undefined;
  size(): number;
}