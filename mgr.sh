deployNginx() {
    pushd docker/basic-services || return 1
    trap 'popd' EXIT
    docker compose -f docker-compose.yaml up nginx -d
}

deployZeroClaw() {
    set -a
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    source "$SCRIPT_DIR/.env"

    pushd docker/claws > /dev/null || return 1
    trap 'popd > /dev/null' EXIT
    
    local GID="$(id -g)"
    export GID
    export UID

    mkdir -p ~/.zeroclaw/workspace

    docker compose -f docker-compose.yaml up zeroclaw -d --wait
    
    cmd="chown $UID:$GID /zeroclaw-data/.zeroclaw/config.toml"
    docker exec -it -u root zeroclaw $cmd

    configPath=~/.zeroclaw/config.toml
    sed -i 's/host = "127\.0\.0\.1"/host = "0.0.0.0"/' $configPath
    sed -i 's/allow_public_bind\s*=\s*false/allow_public_bind = true/' $configPath
    sed -i 's/require_pairing\s*=\s*true/require_pairing = false/' $configPath

    docker restart zeroclaw
    set +a
}

deployOpenClaw() {
    set -a
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    source "$SCRIPT_DIR/.env"

    pushd docker/claws > /dev/null || return 1
    trap 'popd > /dev/null' EXIT
    
    local GID="$(id -g)"
    export GID
    export UID

    mkdir -p ~/.openclaw/{data,workspace}
    docker compose -f docker-compose.yaml up openclaw -d --wait
    docker exec -it openclaw openclaw config set --batch-json '[
        {"path": "gateway.controlUi.allowedOrigins", "value": ["*"]},
        {"path": "gateway.controlUi.allowInsecureAuth", "value": true},
        {"path": "gateway.controlUi.dangerouslyDisableDeviceAuth", "value": true},
        {"path": "gateway.bind", "value": "lan"}
    ]'
    set +a
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
        echo "ok"
    else
        echo "错误: 函数 '$func_name' 不存在"
        exit 1
    fi
}
main $@