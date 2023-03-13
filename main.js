import './style.css';
import {TreeFactory} from './modules/tree.js';
const newTree = TreeFactory([8, 1, 5, 3, 8, 2, 4, 2, 10, 17]);
newTree.insertNode(9);
newTree.deleteNode(3);
console.log(newTree.find(10));
console.log(newTree.levelOrder())
console.log(newTree.preorder());
console.log(newTree.inorder());
const arr = [];
console.log(...arr);



const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

prettyPrint(newTree.root);