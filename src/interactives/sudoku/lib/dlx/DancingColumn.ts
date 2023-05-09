import DancingNode from "./DancingNode";

export default class DancingColumn extends DancingNode {
  public prev: DancingColumn;
  public next: DancingColumn;
  public rowCount: number;

  public constructor() {
    super();
    this.prev = this;
    this.next = this;
    this.rowCount = 0;
  }

  public appendColumn(column: DancingColumn): void {
    this.prev.next = column;
    column.next = this;
    column.prev = this.prev;
    this.prev = column;
  }

  public unlinkHeader() {
    this.next.prev = this.prev;
    this.prev.next = this.next;
  }

  public relinkHeader() {
    this.next.prev = this;
    this.prev.next = this;
  }

  public addNode(node: DancingNode): void {
    this.appendToColumn(node);
    this.rowCount++;
  }

  public relinkNode(node: DancingNode): void {
    node.relinkColumn();
    this.rowCount++;
  }

  public unlinkNode(node: DancingNode): void {
    node.unlinkColumn();
    this.rowCount--;
  }

  public loopNext(action: (node: DancingNode) => void) {
    for (let node = this.next; node !== this; node = node.next)
      action(node);
  }
}