export class DancingNode {
  left: DancingNode = this;
  right: DancingNode = this;
  up: DancingNode = this;
  down: DancingNode = this;
  column: DancingNode = this;
  size: number = 0;
  name: string;
  rowId: number;

  constructor(name: string = "", rowId: number = -1, column?: DancingNode) {
    this.name = name;
    this.rowId = rowId;
    if (column) this.column = column; 
  }

  addDown(node: DancingNode) {
    node.down = this.down;
    node.down.up = node;
    node.up = this;
    this.down = node;
    return node;
  }

  addRight(node: DancingNode) {
    node.right = this.right;
    node.right.up = node;
    node.left = this;
    this.right = node;
    return node;
  }

  unlinkLR() {
    this.left.right = this.right;
    this.right.left = this.left;
  }

  relinkLR() {
    this.left.right = this;
    this.right.left = this;
  }

  unlinkUD() {
    this.up.down = this.down;
    this.down.up = this.up;
  }

  relinkUD() {
    this.up.down = this;
    this.down.up = this;
  }

  cover() {
    this.unlinkLR();
    for (let i = this.down; i !== this; i = i.down) {
      for (let j = i.right; j !== i; j = j.right) {
        j.unlinkUD();
        j.column.size--;
      }
    }
  }

  uncover() {
    for (let i = this.up; i !== this; i = i.up) {
      for (let j = i.left; j !== i; j = j.left) {
        j.column.size++;
        j.relinkUD();
      }
    }
    this.relinkLR();
  }

}