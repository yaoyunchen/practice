/*
  BINARY SEARCH TREE (BST)
  
  Binary tree in which nodes of lesser value are stored on the left while nodes of higher value are stored on the right.
*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}


class LinkedList {
  constructor(head) {
    this.head = head || null;
  }
}


class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}


class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  
  getRoot() {
    return this.root;
  }


  _insertNode(node, newNode) {
    // Send node left if the new value is smaller than the given node's value
    // Send node right if the new value is larger than the given node's value
    if (newNode.value < node.value) {
      if (node.left === null) {
        // If there is no left node, insert it
        node.left = newNode;
        return;
      }

      // If there is a left node, continue down the tree
      this._insertNode(node.left, newNode);
    } else {
      if (node.right === null) {
        // If there is no right node, insert it
        node.right = newNode;
        return;
      }

      // If there is a right node, continue down the tree
      this._insertNode(node.right, newNode);
    }
  }

  
  _removeNode(node, value) {
    // Tree is empty
    if (node === null) return null;

    // Check left subtree if value less than given node
    // Check right subtree if value more than given node
    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    }

    // No children
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }

    // Left child
    if (node.left !== null) {
      node = node.left;
      return node;
    }
    
    // Right child
    if (node.right !== null) {
      node = node.right;
      return node;
    }

    // Both childs
    // Find smallest node in right subtree and replace the node to be deleted
    const minNode = this.findMinNode(node.right);
    node.data = minNode.data;

    node.right = this._removeNode(node.right, minMode.value);
    return node;
  }


  _clone(obj) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
  }


  insert(value) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return;
    }

    this._insertNode(this.root, node);
  }


  findMinNode(node) {
    if (node.left === null) return node;
    return this.findMinNode(node.left);
  }



  remove(value) {
    // Root needs to be re-initialized with root of modified tree
    this.root = this._removeNode(this.root, value);
  }


  search(value, givenNode) {
    const node = givenNode || this.root;
    if (node === null)  return;
    
    if (node.value === value) return node;

    if (value < node.value) {
      this.search(value, node.left)
    } else if (value > node.value) {
      this.search(value, node.right)
    }
  }


  inOrder(providedNode) {
    const node = providedNode || this.root;
    const result = [];

    const traverse = (node) => {
      node.left && traverse(node.left);
      result.push(node.value);
      node.right && traverse(node.right);
    }

    traverse(node);

    return result;
  }


  preOrder(providedNode) {
    const node = providedNode || this.root;
    const result = [];

    const traverse = (node) => {
      result.push(node.value);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }

    traverse(node);

    return result;
  }


  postOrder(providedNode) {
    const node = providedNode || this.root;
    
    const result = [];
    const traverse = (node) => {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      result.push(node.value);
    }

    traverse(node);

    return result;
  }


  leftToRightOrder() {
    let node = this.root;
    const emptyNode = new Node(null)
    const queue = [node];
    const result = [];

    while (node = queue.shift()) {
      result.push(node.value)

      if (node.value !== null) {
        queue.push(node.left || emptyNode);
        queue.push(node.right || emptyNode);
      };
    }

    return result;
  }


  rightToLeftOrder() {
    let node = this.root;
    const emptyNode = new Node(null)
    const queue = [node];
    const result = [];

    while (node = queue.shift()) {
      result.push(node.value)

      if (node.value !== null) {
        queue.push(node.right || emptyNode);
        queue.push(node.left || emptyNode);
      };
    }

    return result;
  } 


  getMaxDepth() {
    let maxDepth = 0;
    
    const traverse = (node, depth) => {
      if (!node) return;

      if (node) {
        maxDepth = depth > maxDepth ? depth : maxDepth;
        traverse(node.left, depth + 1);
        traverse(node.right, depth + 1);
      }
    }

    traverse(this.root, 0);

    return maxDepth;
  }


  getMin() {
    const traverse = (node) => {
      if (!node) return;
      if (!node.left) return node.value;

      traverse(node.left);
    }

    return traverse(this.root);
  }


  getMax() {
    const traverse = (node) => {
      if (!node) return;
      if (!node.right) return node.value;

      traverse(node.right);
    }

    return traverse(this.root);;
  }


  getAverage() {
    const totalValues = this.leftToRightOrder();
    const total = totalValues.reduce((total, value) => {
      if (!value) return total;
      return total + value; 
    }, 0)
    
    const average = total / (totalValues.length - 1);
    
    return average;
  }


  convertToLinkedList() {
    let node = this.root;
    if (!node) return;

    const result = this.inOrder(node);

    let currentListNode = new LinkedListNode(result[0]);
    const list = new LinkedList(currentListNode);

    result.map((value, i) => {
      const newListNode = new LinkedListNode(value);
      currentListNode.next = newListNode;
      currentListNode = currentListNode.next;
    });  

    return list;
  }


  convertToGreaterSumTree() {
    let last = 0;

    let gstRoot = this._clone(this.root);
    const traverse = (node) => {
      if (!node) return;

      traverse(node.right);

      node.value += last;
      last = node.value;

      traverse(node.left);
    }

    traverse(gstRoot);

    return gstTree;
  }
 }


// const BST = new BinarySearchTree();

// BST.insert(15); 
// BST.insert(25); 
// BST.insert(10); 
// BST.insert(7); 
// BST.insert(22); 
// BST.insert(17); 
// BST.insert(13); 
// BST.insert(5); 
// BST.insert(4); 
// BST.insert(9); 
// BST.insert(27); 

// BST.leftToRightOrder();
// BST.rightToLeftOrder();