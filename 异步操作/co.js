/**
 * Module dependencies.
 */
 
var assert = require('assert');
 
/**
 * Expose `thunkify()`.
 */
 
module.exports = thunkify;
 
/**
 * Wrap a regular callback `fn` as a thunk.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */
 
function thunkify(fn) {
    assert('function' == typeof fn, 'function required');
    // 返回一个包含thunk函数的函数，返回的thunk函数用于执行yield，而外围这个函数用于给thunk函数传递参数
    return function() {
        var args = new Array(arguments.length);
        // 缓存当前上下文环境，给fn提供执行环境
        var ctx = this;
 
        // 将参数类数组转化为数组（实现方式略显臃肿，可直接用Array.prototype.slice.call(arguments)实现）
        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
 
        // 真正的thunk函数（有且只有一个参数是callback的函数，且callback的第一个参数为error）
        // 类似于：
        // function(cb) {fs.readFile(path, {encoding: 'utf8}, cb)}
        return function(done) {
            var called;
 
            // 将回调函数再包裹一层，避免重复调用；同时，将包裹了的真正的回调函数push进参数数组
            args.push(function() {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });
 
            try {
                // 在ctx上下文执行fn（一般是异步函数，如：fs.readFile）
                // 并将执行thunkify之后返回的函数的参数（含done回调）传入，类似于执行：
                // fs.readFile(path, {encoding: 'utf8}, done)
                // 关于done是做什么用，则是在co库内
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
};