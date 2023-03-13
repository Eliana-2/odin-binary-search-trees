import {NodeFactory} from './node.js';

function TreeFactory(array) {
  const sortedArray = [...new Set(array)].sort((a, b) => {return a -b});
  const root = buildTree(sortedArray);

  function buildTree(treeArray) {
    if(treeArray.length === 0) {return null}
    else {
      const root = NodeFactory(treeArray[Math.floor(treeArray.length / 2)]);
      root.left = buildTree(treeArray.slice(0, Math.floor(treeArray.length / 2)));
      root.right = buildTree(treeArray.slice(Math.floor(treeArray.length / 2) + 1));
      return root;
    }
  }

  function insertNode(value, currentNode = root) {
    if(currentNode === null) {return NodeFactory(value);}

    if (value < currentNode.data) {currentNode.left = insertNode(value, currentNode.left)}
    else if (value > currentNode.data) {currentNode.right = insertNode(value, currentNode.right)}

    return currentNode;
  }

  function minValue(currentNode = root) {
    if(currentNode.left === null)
    {
      return currentNode.data;
    }
    else {
      return minValue(currentNode.left);
    }
  }

  function deleteNode(value, currentNode = root) {
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

  function find(value, currentNode = root) {
    if(currentNode === null) {return currentNode}
    else if(value < currentNode.data) {return find(value, currentNode. left)}
    else if(value > currentNode.data) {return find(value, currentNode.right)}
    else {return currentNode}
  }

  function levelOrder(queue = [], currentNode = root, levelArray = []) {
    if(currentNode !== null) {
      queue.push(currentNode.left);
      queue.push(currentNode.right);
      levelArray.push(currentNode);
    }
    else if(queue.length === 0) {
      return levelArray;
    }
    const nextNode = queue.shift();
    return levelOrder(queue, nextNode, levelArray);
  }

  function preorder(stack = [], currentNode = root, preorderArray = []) {
    if(currentNode !== null) {
      stack.push(currentNode.right);
      stack.push(currentNode.left);
      preorderArray.push(currentNode);
    }
    else if(stack.length === 0) {
      return preorderArray;
    }
    const nextNode = stack.pop();
    return preorder(stack, nextNode, preorderArray);
  }

  function inorder(currentNode = root, inorderArray = []) {
    if(currentNode !== null) {
      inorderArray.push(...inorder(currentNode.left));
      inorderArray.push(currentNode);
      inorderArray.push(...inorder(currentNode.right));
    }
    return inorderArray;
  }

  function postorder(currentNode = root, postorderArray = []) {
    if(currentNode !== null) {
      postorderArray.push(...postorder(currentNode.left));
      postorderArray.push(...postorder(currentNode.right));
      postorderArray.push(currentNode);
    }
    return postorderArray;
  }

  function height(currentNode = root, heightCounter = -1) {
    if(currentNode !== null) {
      heightCounter++;
      const leftHeight = height(currentNode.left, heightCounter);
      const rightHeight = height(currentNode.right, heightCounter)
      heightCounter = (leftHeight > rightHeight) ? leftHeight : rightHeight;
    }
    return heightCounter;
  }

  function depth(node, currentNode = root, depthCounter = 0) {
    if(currentNode === null) {return}
    else if(node.data > currentNode.data) {return depth(node, currentNode.right, ++depthCounter)}
    else if(node.data < currentNode.data) {return depth(node, currentNode.left, ++depthCounter)}
    else {return depthCounter};
  }

  function isBalanced(currentNode = root) {
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

  return {root, insertNode, deleteNode, find, levelOrder, preorder, inorder, postorder, height, depth, isBalanced}
}

export{TreeFactory};