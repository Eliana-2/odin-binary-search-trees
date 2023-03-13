import {NodeFactory} from './node.js';

function TreeFactory(array) {
  let root = null;
  function getRoot() {return root};
  function setRoot(newRoot) {root = newRoot};

  const sortedArray = [...new Set(array)].sort((a, b) => {return a -b});
  setRoot(buildTree(sortedArray));

  function buildTree(treeArray) {
    if(treeArray.length === 0) {return null}
    else {
      const root = NodeFactory(treeArray[Math.floor(treeArray.length / 2)]);
      root.left = buildTree(treeArray.slice(0, Math.floor(treeArray.length / 2)));
      root.right = buildTree(treeArray.slice(Math.floor(treeArray.length / 2) + 1));
      return root;
    }
  }

  function insertNode(value, currentNode = getRoot()) {
    if(currentNode === null) {return NodeFactory(value);}

    if (value < currentNode.data) {currentNode.left = insertNode(value, currentNode.left)}
    else if (value > currentNode.data) {currentNode.right = insertNode(value, currentNode.right)}

    return currentNode;
  }

  function minValue(currentNode = getRoot()) {
    if(currentNode.left === null)
    {
      return currentNode.data;
    }
    else {
      return minValue(currentNode.left);
    }
  }

  function deleteNode(value, currentNode = getRoot()) {
    if(currentNode === null) {return currentNode}
    else if(value < currentNode.data) {currentNode.left = deleteNode(value, currentNode.left)}
    else if(value >  currentNode.data) {currentNode.right = deleteNode(value, currentNode.right)}
    else {
      if(currentNode.left === null) {return currentNode.right}
      else if(currentNode.right === null) {return currentNode.left}
      else {
        currentNode.data = minValue(currentNode.right);
        currentNode.right = deleteNode(currentNode.data, currentNode.right);
      }
      return currentNode;
    }
  }

  function find(value, currentNode = getRoot()) {
    if(currentNode === null) {return currentNode}
    else if(value < currentNode.data) {return find(value, currentNode. left)}
    else if(value > currentNode.data) {return find(value, currentNode.right)}
    else {return currentNode}
  }

  function levelOrder(queue = [], currentNode = getRoot(), levelArray = []) {
    if(currentNode !== null) {
      queue.push(currentNode.left);
      queue.push(currentNode.right);
      levelArray.push(currentNode.data);
    }
    else if(queue.length === 0) {
      return levelArray;
    }
    const nextNode = queue.shift();
    return levelOrder(queue, nextNode, levelArray);
  }

  function preorder(stack = [], currentNode = getRoot(), preorderArray = []) {
    if(currentNode !== null) {
      stack.push(currentNode.right);
      stack.push(currentNode.left);
      preorderArray.push(currentNode.data);
    }
    else if(stack.length === 0) {
      return preorderArray;
    }
    const nextNode = stack.pop();
    return preorder(stack, nextNode, preorderArray);
  }

  function inorder(currentNode = getRoot(), inorderArray = []) {
    if(currentNode !== null) {
      inorderArray.push(...inorder(currentNode.left));
      inorderArray.push(currentNode.data);
      inorderArray.push(...inorder(currentNode.right));
    }
    return inorderArray;
  }

  function postorder(currentNode = getRoot(), postorderArray = []) {
    if(currentNode !== null) {
      postorderArray.push(...postorder(currentNode.left));
      postorderArray.push(...postorder(currentNode.right));
      postorderArray.push(currentNode.data);
    }
    return postorderArray;
  }

  function height(currentNode = getRoot(), heightCounter = -1) {
    if(currentNode !== null) {
      heightCounter++;
      const leftHeight = height(currentNode.left, heightCounter);
      const rightHeight = height(currentNode.right, heightCounter)
      heightCounter = (leftHeight > rightHeight) ? leftHeight : rightHeight;
    }
    return heightCounter;
  }

  function depth(node, currentNode = getRoot(), depthCounter = 0) {
    if(currentNode === null) {return}
    else if(node.data > currentNode.data) {return depth(node, currentNode.right, ++depthCounter)}
    else if(node.data < currentNode.data) {return depth(node, currentNode.left, ++depthCounter)}
    else {return depthCounter};
  }

  function isBalanced(currentNode = getRoot()) {
    if(currentNode !== null) {
      if(Math.abs(height(currentNode.left) - height(currentNode.right)) > 1) {
        return false;
      }
      else {
        return isBalanced(currentNode.left) && isBalanced(currentNode.right);
      }
    }
    return true;
  }

  function rebalance() {
    const sortedArray = inorder();
    const newRoot = buildTree(sortedArray);
    setRoot(newRoot);
  }

  return {getRoot, insertNode, deleteNode, find, levelOrder, preorder, inorder, postorder, height, depth, isBalanced, rebalance}
}

export{TreeFactory};