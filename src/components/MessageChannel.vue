<template>MessageChannel</template>

<script setup>
function deepClone (obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(obj)
    port2.onmessage = msg => {
      resolve(msg.data)
    }
  })
}

const obj = {
  a: { b: 1 }
}

deepClone(obj).then(res => {
  console.log({ res: res, obj })
  obj.a.b = 2
  console.log({ res: res, obj })
})
</script>

<style></style>
