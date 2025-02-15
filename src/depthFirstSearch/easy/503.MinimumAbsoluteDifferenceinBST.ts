/**
Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.
Input: root = [4,2,6,1,3]
Output: 1
 */

import { TreeNode, convertArrayToTreeNode } from '../../utils/TreeNode.ts';

function getMinimumDifference(root: TreeNode | null): number {
	let min = Infinity;
	const arrayNode: number[] = [];

	function dfs(node: TreeNode | null) {
		if (!node) return;

		dfs(node.left);

		arrayNode.push(node.val);

		dfs(node.right);
	}

	dfs(root);

	for (let i = 0; i < arrayNode.length - 1; i++) {
		min = Math.min(min, arrayNode[i + 1] - arrayNode[i]);
	}

	return min;
}

const root = convertArrayToTreeNode([236, 104, 701, null, 227, null, 911]);
console.log(getMinimumDifference(root));
