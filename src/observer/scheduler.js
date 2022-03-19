import { nextTick } from "../utils"

let queue = [] // 存放watcher
let has = {} // 用于去重
let pending = false // 防抖标识
function flushSchedulerQueue() {
  queue.forEach(ele => ele.run())
  queue = []
  has = {}
  pending = false
}
export function queueWathcer(watcher) {
  const id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
    has[id] = true
  }
  if (!pending) {
    nextTick(flushSchedulerQueue, 0)
  }
} 