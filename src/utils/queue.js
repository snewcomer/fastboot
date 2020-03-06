'use strict';

const debug = require('debug')('fastboot:ember-app');

/**
 * Utility Queue class to store queue of sandboxes that can be leveraged when using `buildSandboxPerVisit`.
 *
 * @public
 */
class Queue {
  constructor(builderFn, maxSize = 1) {
    this.items = [];
    this.maxSize = maxSize;
    this.builderFn = builderFn;
  }

  _addToQueue() {
    this.items.push(this.builderFn());
  }

  enqueue() {
    // when the queue is not full, we add the item into the queue, otherwise ignore adding
    // to the queue.
    if (!this.isFull()) {
      this._addToQueue();
    } else {
      debug('Ignoring adding appInstance to queue as Queue is already full!');
    }
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.items.shift();
    }

    // null here indicates there was nothing to return from the queue
    return null;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.items.length;
  }

  isFull() {
    return this.size() === this.maxSize;
  }
}

module.exports = Queue;
