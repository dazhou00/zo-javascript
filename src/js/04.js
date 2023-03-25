const list = [
  {
    name: 'a',
    dependencies: {
      b: '^1.0.0'
    }
  },
  {
    name: 'b',
    dependencies: {
      d: '^1.0.0'
    }
  },
  {
    name: 'c',
    dependencies: {
      a: '^1.0.0'
    }
  }
]

function checkDeps (list) {
  // 存储路径
  const depMap = {}
  //
  const findPack = name => list.find(l => l.name == name)

  function findDeps (pack, dependencies, path) {
    for (let key in dependencies) {
      if (pack == key) {
        // 得到一条循环引用链
        depMap[pack] = [pack, ...path, key]
        break
      }
      if (depMap[pack] && depMap[pack].indexOf(key) == -1) {
        depMap[pack].push(key)
        const p = findPack(key)
        if (p && p.dependencies) {
          findDeps(pack, p.dependencies, [...path, key])
        }
      }
    }
  }
  list.forEach(item => {
    depMap[item.name] = []
    findDeps(item.name, item.dependencies || {}, [])
  })

  let eachDeps = false

  for (let item in depMap) {
    const path = depMap[item]
    if (path.length.length > 2 && path[0] == path[path.length - 1]) {
      eachDeps = true
      break
    }
  }

  return eachDeps
}

console.log(checkDeps(list))
