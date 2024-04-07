package main

import "fmt"

/*
题目557. 反转字符串中的单词 III(https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)
	描述:
		给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

	示例1：
		输入："Let's take LeetCode contest"
		输出："s'teL ekat edoCteeL tsetnoc"

	提示：
		在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
*/
func main() {
	fmt.Println(reverseWords("Let's take LeetCode contest"))
}

func reverseWords(s string) string {
	rev := make([]byte, len(s))
	for i, j, k := 0, 0, 0; j < len(s); j++ {
		if j == len(s)-1 {
			j = len(s)
		} else if s[j] != ' ' {
			continue
		}
		for cur := j - 1; cur >= i; cur-- {
			rev[k] = s[cur]
			k++
		}
		if j != len(s) {
			rev[k] = s[j]
			k++
			i = j + 1
		}
	}
	return string(rev)
}
