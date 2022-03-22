import CircularBuffer, {
  BufferFullError,
  BufferEmptyError,
} from './circular-buffer';

describe('CircularBuffer', () => {
  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('can read an item just written', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(buffer.read()).toBe('1');
  });

  test('writing full buffer should fail', () => {
    const buffer = new CircularBuffer(3);
    buffer.write('1');
    buffer.write('2');
    buffer.write('sdf');
    expect(() => buffer.write('q')).toThrow(BufferFullError);
  });

  test('deleting item from empty buffer should fail', () => {
    const buffer = new CircularBuffer(5);
    expect(() => buffer.clear()).toThrow(BufferEmptyError);
  });

  test('deleting items should start from older', () => {
    const buffer = new CircularBuffer(5);
    buffer.write(4)
    buffer.write(5)
    buffer.write(6)
    buffer.write(7)
    buffer.write(8)
    buffer.clear()
    buffer.clear()
    expect(buffer.read()).toBe('678');
  });

  test('force writing should replace older values', () => {
    const buffer = new CircularBuffer(7);
    buffer.write(1)
    buffer.write(2)
    buffer.write(3)
    buffer.write(4)
    buffer.write(5)
    buffer.write(6)
    buffer.write(7)
    buffer.forceWrite('f')
    expect(buffer.read()).toBe('f234567');
  });
});
