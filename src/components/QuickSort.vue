<template></template>

<script setup>
function quickSort (arr, startIndex = 0) {
  if (arr.length <= 1) return arr
  const right = []
  const left = []
  // 关键动作
  const startNum = arr.splice(startIndex, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < startNum) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return [...quickSort(left), startNum, ...quickSort(right)]
}

console.log(
  quickSort([
    2, 3, 4, 1, 5, 7, 70, 6, 8, 5, 3, 54, 6, 53, 42, 656, 243, 5654, 2
  ])
)
</script>

<style></style>
