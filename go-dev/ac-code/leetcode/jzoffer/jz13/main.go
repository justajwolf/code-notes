package main

import (
	"container/list"
	"fmt"
)

/*
剑指 Offer 13：机器人的运动范围
	地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
	一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。
	例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
*/

func main() {
	fmtMovingCount(2, 3, 1)
	fmtMovingCount(3, 1, 0)
}
func fmtMovingCount(m, n, k int) {
	fmt.Printf("输入：m = %d, n = %d, k = %d\n", m, n, k)
	fmt.Printf("输出：%+v\n", MovingCount2(m, n, k))
}

// 搜索实现
func MovingCount(m, n, k int) int {
	// 初始化：矩阵标记
	mark := make([][]bool, m)
	for i := 0; i < m; i++ {
		mark[i] = make([]bool, n)
	}
	// return MoveDFS(m, n, k, 0, 0, &mark)
	return MoveBFS(m, n, k, &mark)
}

// 位数求和
func sum(x int) int {
	count := 0
	for x != 0 {
		count += x % 10
		x /= 10
	}
	return count
}

// DFS深搜
func MoveDFS(m, n, k, x, y int, ptr_mark *[][]bool) int {
	// 当前坐标出界了，不能搜索遍历，返回0
	if x >= m || y >= n || x < 0 || y < 0 {
		return 0
	}
	// 当前坐标走了，不用重复搜索遍历了，返回0
	if (*ptr_mark)[x][y] {
		return 0
	}
	// 当前坐标不满足条件，不用搜索遍历，返回0
	if sum(x)+sum(y) > k {
		return 0
	}

	// 标记走过当前坐标
	(*ptr_mark)[x][y] = true

	// 当前左边可以进行上左下右的搜索遍历, 初始化count
	count := 1
	// 只需要向两个方向去搜索就行，，，
	// count += MoveDFS(m, n, k, x-1, y, ptr_mark)	// 向上遍历
	// count += MoveDFS(m, n, k, x, y-1, ptr_mark)	// 向左遍历
	count += MoveDFS(m, n, k, x+1, y, ptr_mark) // 向下遍历
	count += MoveDFS(m, n, k, x, y+1, ptr_mark) // 向右遍历
	return count
}

// BFS广搜
func MoveBFS(m, n, k int, ptr_mark *[][]bool) int {
	// 定义坐标
	type site struct {
		x, y int
	}
	count := 0 // 初始化计数器
	queue := list.New()
	queue.PushBack(site{0, 0}) // 起始坐标入队
	for queue.Len() != 0 {
		e := queue.Front()
		s := queue.Remove(e).(site)
		x, y := s.x, s.y
		// 当前坐标出界了，不能搜索遍历，返回0
		if x >= m || y >= n || x < 0 || y < 0 {
			continue
		}
		// 当前坐标走了，不用重复搜索遍历了，返回0
		if (*ptr_mark)[x][y] {
			continue
		}
		// 当前坐标不满足条件，不用搜索遍历，返回0
		if sum(x)+sum(y) > k {
			continue
		}
		queue.PushBack(site{x, y + 1}) // 向右搜索
		queue.PushBack(site{x + 1, y}) // 向下搜索

		(*ptr_mark)[x][y] = true // 标记当前坐标已走过
		count++                  // 计数器累计当前坐标
	}
	return count
}

// 递推实现
func MovingCount2(m, n, k int) int {
	// 初始化：递推矩阵
	visit := make([][]int, m)
	for i := 0; i < m; i++ {
		visit[i] = make([]int, n)
	}
	visit[0][0] = 1 // 起始坐标标记
	count := 1
	for x := 0; x < m; x++ {
		for y := 0; y < n; y++ {
			// 起始坐标， 跳过
			if x == 0 && y == 0 {
				continue
			}
			// 当前坐标不满足条件，跳过
			if sum(x)+sum(y) > k {
				continue
			}

			if x-1 >= 0 {
				visit[x][y] |= visit[x-1][y]
			}
			if y-1 >= 0 {
				visit[x][y] |= visit[x][y-1]
			}
			if visit[x][y] == 1 {
				count++
			}
		}
	}
	return count
}
