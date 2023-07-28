interface IStack<T> {
	push: (item: T) => void;
	pop: () => void;
	peak: () => number;
	getSize: () => number;
	printStack: () => T[];
	clear: () => void;
}

export class Stack<T> implements IStack<T> {
	private container: T[] = [];

	push = (item: T): void => {
		this.container.push(item)
	};

	pop = (): void => {
		this.container.pop()
	};

	getSize = (): number => {
		return this.container.length;
	}

	peak = (): number => {
		return this.getSize() - 1;
	};

	printStack = (): T[] => {
		return this.container;
	}

	clear = () => {
		this.container = [];
	}
}
