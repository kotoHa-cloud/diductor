const math = require('mathjs');
const Heap = require('heap-js'); // ヒープキューを使うためのライブラリ

class MinHeap {
    constructor() {
        this.heap = [];
    };

    //要素を追加
    insert(element) {
        this.heap.push(element);
        this.bubbleUp(this.heap.length - 1);
    };

    //最小の要素を検索
    pop() {
        if (this.isEmpty()) {
            return null;
        };

        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            //適切な場所に再配置
            this.sinkDown(0);
        };
        return min;
    };

    //ヒープのプロパティを再確立
    isEmpty() {
        return this.heap.length === 0;
    };

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] > this.heap[index][0]) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                index = parentIndex;
            } else {
                break;
            };
        };
    };

    //ヒープのプロパティを再確立
    sinkDown(index) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        let smallest = index;

        if (leftIndex < this.heap.length && this.heap[leftIndex][0] < this.heap[smallest][0]) {
            smallest = leftIndex;
        };

        if (rightIndex < this.heap.length && this.heap[rightIndex][0] < this.heap[smallest][0]) {
            smallest = rightIndex;
        };

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.sinkDown(smallest);
        };
    };
};

/* 使用例
　　本来は以下の部分を複数計算し、最短経路を算出します。
　　今回は、最短経路ではなく、簡単な優先度で小さい順に並べるプログラムです */
const minHeap = new MinHeap();
minHeap.insert([5, 'A']);
minHeap.insert([2, 'B']);
minHeap.insert([8, 'C']);

while (!minHeap.isEmpty()) {
    const [priority, element] = minHeap.pop();
    console.log(`Priority: ${priority}, Element: ${element}`);
};