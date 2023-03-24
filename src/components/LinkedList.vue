<template></template>

<script setup>
// 模拟链表

class Node {
  constructor (data) {
    this.data = data // 节点数据
    this.next = null // 指向下一个节点
    this.prve = null // 指向上一个节点
  }
}

class linkedList {
  constructor () {
    this.head = null // 链表头
    this.tail = null // 链表尾
  }

  // 在链表尾部添加新节点
  add (item) {
    let node = new Node(item)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      node.prve = this.tail
      this.tail.next = node
      this.tail = node
    }
  }

  // 链表指定位置添加节点
  addAt (index, item) {
    let current = this.head
    let counter = 1
    let node = new Node(item)

    if (index == 0) {
      this.head.prve = node
      node.next = this.head
      this.head = node
    } else {
      while (current) {
        current = current.next
        if (counter == index) {
          node.prve = current.prve
          current.prve.next = node
          node.next = current
          current.prve = node
        }
        counter++
      }
    }
  }

  //
  remove (item) {
    let current = this.head
    while (current) {
      if (current.data == item) {
        if (current == this.head && current == this.tail) {
          this.head = null
          this.tail = null
        } else if (current == this.head) {
          this.head = this.head.next
          this.head.prve = null
        } else if (current == this.tail) {
          this.tail = this.tail.prve
          this.tail.next = null
        } else {
          current.prve.next = current.next
          current.next.prve = current.prve
        }
      }

      current = current.next
    }
  }

  removeAt (index) {
    let current = this.head
    let counter = 1
    if (index == 0) {
      this.head = this.head.next
      this.head.prve = null
    } else {
      while (current) {
        current = current.next
        if (current == this.tail) {
          this.tail = this.tail.prve
          this.tail.next = null
        } else if ((index = counter)) {
          current.prve.next = current.next
          current.next.prve = current.prve
          break
        }
        counter++
      }
    }
  }

  reverse () {
    let current = this.head
    let prve = null
    while (current) {
      let next = current.next
      current.next = prve
      current.prve = next
      prve = current
      current = next
    }

    this.tail = this.head
    this.head = prve
  }

  swap (index1, index2) {
    if (index1 > index2) {
      return this.swap(index2, index1)
    }

    let current = this.head
    let counter = 0
    let firstNode

    while (current != null) {
      if (counter == index1) {
        firstNode = current
      } else if (counter == index2) {
        let temp = current.data
        current.data = firstNode.data
        firstNode.data = temp
      }

      current = current.next
      counter++
    }
    return true
  }

  traverse (fn) {
    let current = this.head
    while (current != null) {
      fn(current)
      current = current.next
    }
    return true
  }

  find (item) {
    let current = this.head
    let counter = 0
    while (current) {
      if (current.data == item) {
        return counter
      }
      current = current.next
      counter++
    }

    return true
  }

  isEmpty () {
    return this.length() < 1
  }

  length () {
    let current = this.head
    let counter = 0
    while (current) {
      counter++
      current = current.next
    }

    return counter
  }
}

const a = new linkedList()
a.add(1)
a.add(2)
a.add(3)
a.add(4)

// a.addAt(3, 8)

// a.remove(8)

// a.reverse()
console.log(a.isEmpty())
</script>

<style></style>
