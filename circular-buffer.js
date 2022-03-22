//
// This is only a SKELETON file for the 'Circular Buffer' exercise. It's been provided as a
// convenience to get you started writing code faster.
//


class CircularBuffer {
  constructor(length) {
    this.length = length;
    this.buffer = new Array(length);
    this.start = 0;
    this.next = 0;
    this.isFull = false;
  }

  onNext() {
    if (this.next === this.length - 1) {
      this.next = 0
    } else {
      this.next += 1
    }
  }

  onChangeStart() {
    if(this.start === this.length - 1) {
      this.start = 0
    } else {
      this.start += 1
    }
  }

  write(value) {
    if (this.isFull) {
      throw new BufferFullError('bufferr is full')
    }
    this.buffer[this.next] = value;
    this.onNext();
    if (this.buffer.filter(item => item).length === this.length) {
      this.isFull = true
    }
  }

  read() {
    if (this.buffer.filter(item => item).length) {
      return this.buffer.filter(item => item).join('');
    } else {
      throw new BufferEmptyError('buffer is empty');
    }  
  }

  forceWrite(value) {
    if (this.isFull) {
      this.buffer[this.start] = value
      this.onChangeStart()
      this.onNext()
    }
  }

  clear() {
    if (!this.buffer.filter(item => item).length) {
      throw new BufferEmptyError('buffer is empty');
    }
    this.buffer[this.start] = null
    this.onChangeStart()
    this.isFull = false
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor(err) {
    super();
    this.err = err
  }
}

export class BufferEmptyError extends Error {
  constructor(err) {
    super();
    this.err = err
  }
  
}
