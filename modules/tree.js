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
  function deleteNode(value, currentNode = root) {
    
  }
  return {root, insertNode};
}

export{TreeFactory};