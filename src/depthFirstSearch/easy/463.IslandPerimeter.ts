/**
You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, 
and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. 
One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.
 */

/**
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image above.
*/

function islandPerimeter(grid: number[][]): number {
	let res = 0;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 1) {
				res += 4;
				res -= checkLeft(grid, i, j);
				res -= checkTop(grid, i, j);
				res -= checkRight(grid, i, j);
				res -= checkBottom(grid, i, j);
			}
		}
	}

	return res;
}

function checkLeft(grid: number[][], i: number, j: number) {
	return grid[i][j - 1] ? 1 : 0;
}
function checkTop(grid: number[][], i: number, j: number) {
	if (!grid[i - 1]) return 0;

	return grid[i - 1][j] ? 1 : 0;
}
function checkRight(grid: number[][], i: number, j: number) {
	return grid[i][j + 1] ? 1 : 0;
}
function checkBottom(grid: number[][], i: number, j: number) {
	if (!grid[i + 1]) return 0;
	return grid[i + 1][j] ? 1 : 0;
}

const grid = [
	[0, 1, 0, 0],
	[1, 1, 1, 0],
	[0, 1, 0, 0],
	[1, 1, 0, 0],
];

console.log(`The result should be 16`, islandPerimeter(grid));
