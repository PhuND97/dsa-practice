export class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

function insertIntoBST(root: TreeNode | null, val: number): TreeNode {
	if (root === null) {
		return new TreeNode(val);
	}
	if (val < root.val) {
		root.left = insertIntoBST(root.left, val);
	} else {
		root.right = insertIntoBST(root.right, val);
	}
	return root;
}

export function convertArrayToTreeNode(
	input: (number | null)[]
): TreeNode | null {
	if (input.length === 0) {
		return null;
	}
	let root: TreeNode | null = null;
	for (const val of input) {
		if (val !== null) root = insertIntoBST(root, val);
	}
	return root;
}
