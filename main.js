import './style.css';
import {TreeFactory} from './modules/tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const newTree = TreeFactory([8, 1, 5, 3, 8, 2, 4, 2, 10, 17]);
prettyPrint(newTree.getRoot());

console.log(newTree.preorder());
console.log(newTree.inorder());
console.log(newTree.postorder());

newTree.insertNode(101);
newTree.insertNode(102);
newTree.insertNode(103);
newTree.insertNode(104);
newTree.insertNode(105);
prettyPrint(newTree.getRoot());

console.log(newTree.isBalanced());

newTree.rebalance();
prettyPrint(newTree.getRoot());

console.log(newTree.isBalanced());

console.log(newTree.preorder());
console.log(newTree.inorder());
console.log(newTree.postorder());