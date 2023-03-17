import { DancingNode } from "./DancingNode";

type Flag = { solved: boolean }

export class DancingLink {
  header: DancingNode;
  possible: DancingNode[] = [];
  answers: DancingNode[][] = [];

  constructor(cover: boolean[][]) {
    this.header = new DancingNode("header");
    let columns: DancingNode[] = [];

    for (let i = 0; i < cover[0].length; i++) {
      const node = new DancingNode(i.toString());
      columns.push(node);
      this.header = this.header.addRight(node);
    }

    this.header = this.header.right;

    for (let i = 0; i < cover.length; i++) {
      let prev: DancingNode | undefined = undefined;
      for (let j = 0; j < cover[i].length; j++) {
        if (!cover[i][j]) continue;
        const column = columns[j];
        const node = new DancingNode("", i, column);
        if (!prev) prev = node;
        column.up.addDown(node);
        prev.addRight(node);
        column.size++;
      }
    }

    this.header.size = cover[0].length;
  }

  search(k: number, flag: Flag, findOne: boolean) {
    if (flag.solved && findOne) return;

    if (this.header.right == this.header) {
      this.answers.push([...this.possible]);
      flag.solved = true;
    }

    let c = this.findLeftMostUncovered();
    c.cover();

    for (let r = c.down; r != c; r = r.down) {
      this.possible.push(r);
      for (let j = c.right; j != c; j = j.right)
        j.column.cover();
      this.search(k + 1, flag, findOne);
      this.possible.pop();
      c = r.column;
      
      for (let j = r.left; j != r; j = j.left) {
        j.column.uncover();
      }
    }

    c.uncover();
  }

  solve(findOne: boolean = false) {
    return this.search(0, { solved: false }, findOne);
  }

  findLeftMostUncovered() {
    let node = this.header.right;
    let size: number = Infinity;
    for (let i = this.header.right; i != this.header; i = i.right) {
      if (i.size < size) {
        node = i;
        size = i.size;
      }
    }
    return node;
  }
}