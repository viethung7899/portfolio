import type DancingColumn from "./DancingColumn";

export type NodeAction = (node: DancingNode) => void;

export default class DancingNode {
  public left: DancingNode;
  public right: DancingNode;
  public up: DancingNode;
  public down: DancingNode;

  public constructor(
    public header?: DancingColumn,
    public rowIndex?: number
  ) {
    this.left = this;
    this.right = this;
    this.up = this;
    this.down = this;
    header?.addNode(this);
  }

  public appendToRow(node: DancingNode) {
    this.left.right = node;
    node.right = this;
    node.left = this.left;
    this.left = node;
  }

  public appendToColumn(node: DancingNode) {
    this.up.down = node;
    node.down = this;
    node.up = this.up;
    this.up = node;
  }

  public unlinkColumn() {
    this.down.up = this.up;
    this.up.down = this.down;
  }

  public relinkColumn() {
    this.down.up = this;
    this.up.down = this;
  }

  public loop(action: NodeAction, direction: "up" | "down" | "left" | "right") {
    for (let node = this[direction]; node !== this; node = node[direction]) {
      action(node);
    }
  }
}