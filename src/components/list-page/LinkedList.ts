export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface TLinkedList<T> {
  [Symbol.iterator](): Iterator<T>;

  prepend(value: T): void;
  append(value: T): void;
  addByIndex(value: T, index: number): void;

  deleteHead(): void;
  deleteTail(): void;
  deleteByIndex(index: number): void;

  toArray(): Array<T>;
}

export class LinkedList<T> implements TLinkedList<T> {
  private head: Node<T> | null;
  private size: number;


  constructor(array: Array<T> = []) {
    this.head = null;
    this.size = 0;

    for (const item of array) {
      this.append(item);
    }
  }

  *[Symbol.iterator]() {
    for (let curr = this.head; curr !== null; curr = curr.next) {
      yield curr.value;
    }
  }

  prepend(value: T) {
    const node = new Node(value, this.head);
    this.head = node;
    this.size++;
  }

  append(value: T) {
    const node = new Node(value);
    if (this.head) {
      let curr = this.head;

      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    } else {
      this.head = node;
    }

    this.size++;
  }

  addByIndex(value: T, index: number) {
    if (index < 0 || index > this.size)
      throw new Error(`Неверный индекс. [0, ${this.size}]`);

    if (!this.head || index === 0) this.prepend(value);
    else if (index === this.size - 1) this.append(value)
    else {
      let curr = this.head;
      let currIndex = 0;

      while (currIndex !== (index - 1) && curr.next) {
        curr = curr.next;
        currIndex++;
      }

      const node = new Node(value, curr.next);
      curr.next = node;
      this.size++;
    }
  }

  deleteHead() {
    if (!this.head) throw new Error('Список пуст!');

    this.head = this.head.next;
    this.size--;
  }

  deleteTail() {
    if (!this.head?.next) this.head = null;
    else {
      let curr = this.head;
      while (curr.next?.next) {
        curr = curr.next;
      }
      curr.next = null;
    }

    this.size--;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size)
      throw new Error(`Неверный индекс. [0, ${this.size}]`);

    if (!this.head || index === 0) this.deleteHead();
    else {
      let previous = this.head;
      while (index - 1 && previous.next && previous.next.next) {
        previous = previous.next;
      }
      previous.next = previous.next!.next;
    }
    
    this.size--;
  }

  toArray() {
    return [...this];
  }
}