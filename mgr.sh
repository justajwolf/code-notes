deployNginx() {
    pushd docker/basic-services || return 1
    trap 'popd' EXIT
    docker compose -f docker-compose.yaml up nginx -d
}

main() {
    # 检查是否传递了函数名
    if [ $# -lt 1 ]; then
        echo "用法: $0 <函数名> [参数]"
        exit 1
    fi

    # 获取函数名
    local func_name="$1"
    shift  # 移除函数名，剩下的参数作为函数参数

	# 检查函数是否存在
    if declare -f "$func_name" > /dev/null; then
        # 调用函数，传递剩余参数
        "$func_name" "$@"
    else
        echo "错误: 函数 '$func_name' 不存在"
        exit 1
    fi
}
main $@