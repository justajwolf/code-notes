## Commands
### 基本数据结构
```
string: set/get
hash: hset/hget
list: lpush/lrange
set: sadd/smembers
sorted-set: zadd/zrangebyscore/zrevrange
```
1. hsetnx
  > 设置指定field，若不存在则设置值(return)，否则，不设置(return 0)
2. 