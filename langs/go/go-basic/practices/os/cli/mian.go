package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	inReader := bufio.NewReader(os.Stdin)
	fmt.Println("please input your name:")
	in, err := inReader.ReadString('\n')
	if err != nil {
		fmt.Printf("An error occurred: %s\n", err)
		os.Exit(1)
	}
	name := in[:len(in)-2]
	fmt.Printf("Hello, %s! What can I do for you?\n", name)
	for {
		in, err = inReader.ReadString('\n')
		if err != nil {
			fmt.Printf("An error occurred: %s\n", err)
		}
		in = in[:len(in)-2]
		in = strings.ToLower(in)
		switch in {
		case "":
			continue
		case "nothing", "bye":
			fmt.Println("Bye~!")
			os.Exit(0)
		default:
			fmt.Println("Sorry, I didn't catch you.")
		}
	}
}
