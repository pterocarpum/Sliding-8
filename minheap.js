const MinHeap = { 
    /* siftDown:
     * The node at the given index of the given heap is sifted down in  
     * its subtree until it does not have a child with a lesser value. 
     */
    siftDown(arr, i=0, value=arr[i]) {
        if (i < arr.length) {
            let key = value[0]; 
            while (true) {
                let j = i*2+1;
                if (j+1 < arr.length && arr[j][0] > arr[j+1][0]) j++;
                if (j >= arr.length || key <= arr[j][0]) break;
                arr[i] = arr[j];
                i = j;
            }
            arr[i] = value;
        }
    },
    /* heapify:
     * The given array is reordered in-place so that it becomes a valid heap.
     * Elements in the given array must have a [0] property (e.g. arrays). 
     * That [0] value serves as the key to establish the heap order. The rest 
     * of such an element is just payload. It also returns the heap.
     */
    heapify(arr) {
        for (let i = arr.length>>1; i--; ) this.siftDown(arr, i);
        return arr;
    },
    /* pop:
     * Extracts the root of the given heap, and returns it (the subarray).
     * Returns undefined if the heap is empty
     */
    pop(arr) {
        return this.exchange(arr, arr.pop());
    },
    /* exchange:
     * Replaces the root node of the given heap with the given node, and 
     * returns the previous root. Returns the given node if the heap is empty.
     * This is similar to a call of pop and push, but is more efficient.
     */
    exchange(arr, value) {
        if (!arr.length) return value;
        let oldValue = arr[0];
        this.siftDown(arr, 0, value);
        return oldValue;
    },
    /* push:
     * Inserts the given node into the given heap. It returns the heap.
     */
    push(arr, value) {
        let key = value[0],
            i = arr.length,
            j;
        while ((j = (i-1)>>1) >= 0 && key < arr[j][0]) {
            arr[i] = arr[j];
            i = j;
        }
        arr[i] = value;
        return arr;
    }
};
