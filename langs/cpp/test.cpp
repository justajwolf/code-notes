#include <iostream>

#ifndef POSTJECT_SENTINEL_FUSE
#define POSTJECT_SENTINEL_FUSE \
    "POSTJECT_SENTINEL_fce680ab2cc467b6e072b8b5df1996b2"
#endif

int main()
{
    static const volatile char *sentinel = POSTJECT_SENTINEL_FUSE ":0";
    auto r = sentinel[sizeof(POSTJECT_SENTINEL_FUSE)] == '1';

    std::cout << r << std::endl;
    return 0;
}
