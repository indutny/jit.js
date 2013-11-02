var common = require('../common'),
    test = common.test,
    Buffer = require('buffer').Buffer;

if (process.arch !== 'x64')
  return;

var buf = new Buffer([7, 6, 5, 4, 3, 2, 1, 0]);

describe('JIT.js x64 Basics', function() {
  test('should compile function with high registers', function() {
    this.Entry();

    this.xor('r11', 'r11');
    this.push('r11');
    this.mov('r11', 34);
    this.mov('rax', 'r11');
    this.pop('r11');
    this.add('r11', 13);
    this.sub('rax', 'r11');
    this.add('rax', 'rax');

    this.Exit();
  }, 42);

  test('should support accesing stack', function() {
    this.Entry(1);

    var slot = ['rbp', -8];
    this.mov(slot, 42);
    this.mov('rax', slot);
    this.Exit();
  }, 42);

  test('should support this.ptr()', function() {
    this.Entry();
    this.mov('rax', this.ptr(buf));
    this.mov('rax', ['rax']);
    this.Exit();
  }, 0x1020304050607);
});
