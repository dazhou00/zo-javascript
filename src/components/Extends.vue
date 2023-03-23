<template>实现继承</template>

<script setup>
// 通过原型链实现继承
// 父类：公共属性和方法
function Person () {
  this.name = 'zo'
}

// 父类定一个吃的方法
Person.prototype.eating = function () {
  console.log(this.name + ' is eating')
}

// 子类：属性和方法
function Student () {
  this.sno = '001'
}

// Student 的原型对象指向一个 Person的实例对象 per
const per = new Person()
Student.prototype = per

// 子类定义一个学习的方法
Student.prototype.studying = function () {
  console.log(this.name + ' is studying')
}

const stu = new Student()

console.log(stu)
console.log(stu.name) // stu 对象中没有 name 属性，回去他的原型 per 上面找，per 对象上有属性 name
stu.eating()
stu.studying()
/**
 * 通过原型链继承的弊端
 * 1. 通过直接打印对象是看不到这个属性的（继承属性看不到）
 * 2. 属性被多个对象共享，如果这个属性是一个引用类型，会造成问题 (修改引用类型 会互相影响)
 * 3. 不能给 Person 传递参数，因为这个对象是一次性创建的（不能定制化）
 */
</script>

<style></style>
