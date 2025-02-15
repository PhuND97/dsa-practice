/**
Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.

If the tree has more than one mode, return them in any order.

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than or equal to the node's key.
The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
Both the left and right subtrees must also be binary search trees.
 */

/**
 * 
Input: root = [1,null,2,2]
Output: [2]
 */

class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

export function findMode(root: TreeNode | null): number[] {
	const map: Map<number, number> = new Map<number, number>();

	function dfs(node: TreeNode | null) {
		if (!node) return;

		if (!map.get(node.val)) {
			map.set(node.val, 1);
		} else {
			const currentVal = map.get(node.val)!;
			map.set(node.val, currentVal + 1);
		}

		dfs(node.left);
		dfs(node.right);
	}
	dfs(root);

	const reversedMap = {};

	map.forEach((val, key) => {
		if (reversedMap[val] == null) {
			reversedMap[val] = [key];
		} else {
			reversedMap[val].push(key);
		}
	});

	return Object.values(reversedMap)[
		Object.keys(reversedMap).length - 1
	] as number[];
}

const root = new TreeNode(2);
root.val = 1;
root.right = new TreeNode(1);
root.right.val = 2;

const result = findMode(root);
console.log('The expected output will be [1, 2]', result); // Output: [2]
