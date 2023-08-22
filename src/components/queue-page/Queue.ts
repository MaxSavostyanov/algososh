interface IQueue<T> {
	getHead: () => number;
	getTail: () => number;
	getSize: () => number;
	isEmpty: () => boolean;
	enqueue: (item: T) => void;
	dequeue: () => void;
	printQueue: () => Array<T | undefined>;
	clear: () => void;
}

export class Queue<T> implements IQueue<T> {
	private readonly size: number = 0;
	private container: (T | undefined)[] = [];
	private length: number = 0;
	private head = 0;
	private tail = 0;
	
	constructor(size: number) {
			this.size = size;
			this.container = Array(size);
	}

	getHead = () => this.head;

	getTail = () => this.tail;

	getSize = () => this.size;

	isEmpty = () => this.length === 0;

	enqueue = (item: T) => {
			if (this.length >= this.size) {
					throw new Error('Maximum length exceeded');
			}
			this.container[this.tail % this.size] = item;
			this.tail++;
			this.length++;
	};

	dequeue = () => {
			if (this.isEmpty()) {
					throw new Error('No elements in the queue');
			}
			this.container[this.head % this.size] = undefined;
			this.head = (this.head + 1 !== this.size) ? this.head + 1 : this.head;
			this.length--;
	};

	printQueue = (): (T | undefined)[] => [...this.container];

	clear = () => {
			this.head = 0;
			this.tail = 0;
			this.length = 0;
			this.container = Array(this.size);
	};
}
