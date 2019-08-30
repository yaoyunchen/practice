/*
  Create a function that remove vowels from a string
*/
const vowelStripper = (string) => {
  if (!string) return ''
  return string.split(/a|e|i|o|u/).join('')
}

describe('vowelStripper()', () => {
  it('should strip vowels out of a string successfully', () => {
    expect(vowelStripper('This is a string.')).toEqual('Ths s  strng.')
  })

  it('should not return any vowels', () => {
    ['a', 'e', 'i', 'o', 'u'].map((vowel) => {
      expect(vowelStripper('abcdefghijklmnopqrstuvwxyz')).not.toContain(vowel)
    })
  })
})


/*
  Given a valid IPv4 address, return a defanged version of that IP address.
  ie. Replace every period '.' with '[.]'
*/
const ipDefanger = ip => ip.split('.').join('[.]')

describe('ipDefanger', () => {
  it('should replace "." in 127.0.0.1 with "[.]"', () => {
    expect(ipDefanger('127.0.0.1')).toEqual('127[.]0[.]0[.]1')
  })
})


/*
  You're given strings J representing the types of stones that are jewels, and S representing the stones you have.  Each character in S is a type of stone you have.  You want to know how many of the stones you have are also jewels.

  The letters in J are guaranteed distinct, and all characters in J and S are letters. Letters are case sensitive, so "a" is considered a different type of stone from "A".  S & J will have length at most 50.

  ex.
  J = "aA", S = "aAAbbb"
  output = 3
  J = "z", S = "ZZ"
  output = 0
*/
const jewelFinder = (j, s) => {
  const jewels = j.split('')
  const stones = s.split('')
  let jewelCounter = 0;

  stones.map((stone) => {
    if (jewels.includes(stone)) jewelCounter += 1
  })

  return jewelCounter;
}

describe('jewelFinder', () => {
  it('should find three jewels with the given iputs', () => {
    expect(jewelFinder('aA', 'aAAbbb')).toEqual(3)
  })

  it('should not find any jewels with the given iputs', () => {
    expect(jewelFinder('z', 'ZZ')).toEqual(0)    
  })
})


/*
  In a 2 dimensional array grid, each value grid[i][j] represents the height of a building located there. We are allowed to increase the height of any number of buildings, by any amount (the amounts can be different for different buildings). Height 0 is considered to be a building as well. 

  At the end, the "skyline" when viewed from all four directions of the grid, i.e. top, bottom, left, and right, must be the same as the skyline of the original grid. A city's skyline is the outer contour of the rectangles formed by all the buildings when viewed from a distance. See the following example.

  What is the maximum total sum that the height of the buildings can be increased?

  Ex:
  Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
  Output: 35
  Explanation: 
  The grid is:
  [ [3, 0, 8, 4], 
    [2, 4, 5, 7],
    [9, 2, 6, 3],
    [0, 3, 1, 0] ]

  The skyline viewed from top or bottom is: [9, 4, 8, 7]
  The skyline viewed from left or right is: [8, 7, 9, 3]

  The grid after increasing the height of buildings without affecting skylines is:

  gridNew = [ [8, 4, 8, 7],
              [7, 4, 7, 7],
              [9, 4, 8, 7],
              [3, 3, 3, 3] ]
*/
const rotate2DArray = array => array[0].map((col, i) => array.map(row => row[i]))

const maxSkylineSumCalculator = (grid) => {
  if (grid.length !== 4) return 0

  // Stops grid from being overwritten.
  const tempGrid = JSON.parse(JSON.stringify(grid))
  const rowMax = tempGrid.map(block => block.sort()[block.length - 1])

  const rotatedGrid = rotate2DArray(grid)
  const colMax = rotatedGrid.slice(0).map(block => block.sort()[block.length - 1])

  return grid.reduce((total, block, i) => {
    const blockTotal = block.reduce((buildingTotal, building, j) => {
      const comparitor = rowMax[i] < colMax[j] ? rowMax[i] : colMax[j]
      return buildingTotal + comparitor - building
    }, 0)

    return total + blockTotal
  }, 0)
}

describe('maxSkylineSumCalculator', () => {
  it('should calculate the maximum sum of increase allowed', () => {
    const grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
    expect(maxSkylineSumCalculator(grid)).toEqual(35)
  })
})


/*
  Given the root of a binary search tree with distinct values, modify it so that every node has a new value equal to the sum of the values of the original tree that are greater than or equal to node.val.

  As a reminder, a binary search tree is a tree that satisfies these constraints:
    - The left subtree of a node contains only nodes with keys less than the node's key.
    - The right subtree of a node contains only nodes with keys greater than the node's key.
    - Both the left and right subtrees must also be binary search trees.

  Ex.
    Input: [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
    Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
*/

const bstToGstTransformer = (root) => {
  let last = 0

  const depthFirstSearch = (node) => {
    if (!root) return

    depthFirstSearch(node.right)

    node.value += last
    last = node.value

    depthFirstSearch(node.left)
  }

  depthFirstSearch(root)
  return root
}