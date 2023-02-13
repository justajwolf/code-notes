#include <string.h>
#include <assert.h>
int KMPStrMatching(String T, String P, int N, int startIndex)
{
    int lastIndex = T.strlen() - P.strlen();

    if ((lastIndex - startIndex) < 0) // 若 startIndex过大,则无法匹配成功

        return (-1); // 指向P内部字符的游标

    int i; // 指向T内部字符的游标

    int j = 0; // 指向P内部字符的游标
    for (i = startIndex; i < T.strlen(); i++)
    {
        while (P[j] != T[i] && j > 0)
            j = N[j - 1];
        if (P[j] == T[i])
            j++;
        if (j == P.strlen())
            return (1 - j + 1); // 匹配成功,返回该T子串的开始位置
    }

    return (-1);
}