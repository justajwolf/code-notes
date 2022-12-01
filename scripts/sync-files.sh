#!/bin/bash 

echo "all files sync start......"
./fetch-github-file.js https://raw.githubusercontent.com/justajwolf/nodejs/main/README.md --dir=../langs/nodejs
./fetch-github-file.js https://raw.githubusercontent.com/justajwolf/go/main/README.md --dir=../langs/go
./fetch-github-file.js https://raw.githubusercontent.com/justajwolf/go/main/fileserver/README.md --out=../langs/go/fileserver.md
./fetch-github-file.js https://raw.githubusercontent.com/EbookFoundation/free-programming-books/main/books/free-programming-books-zh.md --dir=../os
echo "all files sync success."