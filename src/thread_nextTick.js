function ThreadNextTick(){
  function nextTick(cb){
    thread._ntq.push(cb);
    return this;
  }
  function dispatchNextTicks(l, p, err, _ntq){
    var e;
    if (l = (_ntq = thread._ntq).length) {
      p = err = 0;
      try {
        for (;;) {
          _ntq[p]();
          if (!(++p < l)) {
            break;
          }
        }
      } catch (e$) {
        e = e$;
        thread._ntq = _ntq.slice(++p);
        throw e;
      }
      return (thread._ntq = _ntq.slice(p)).length;
    }
    return 0;
  }
  thread._ntq = [];
  thread.nextTick = nextTick;
  self.addEventListener = function(event, cb){
    return this.thread.on(event, cb);
  };
  self.close = function(){
    return this.thread.emit('close');
  };
  Object.defineProperty(self, 'onmessage', {
    set: function(cb){
      return this.addEventListener('message', cb);
    }
  });
  return dispatchNextTicks;
}
