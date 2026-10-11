#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VSIX_PATH="${1:-}"

if ! command -v code >/dev/null 2>&1; then
  echo "错误：未找到 code 命令。请先安装 VS Code，并在 PATH 中启用 code 命令。" >&2
  exit 1
fi

if [[ -z "${VSIX_PATH}" ]]; then
  if ! command -v npm >/dev/null 2>&1; then
    echo "错误：未找到 npm。首次从源码安装需要 Node.js 和 npm。" >&2
    exit 1
  fi

  cd "${SCRIPT_DIR}"
  if [[ ! -d node_modules ]]; then
    echo "正在安装项目依赖..."
    npm install
  fi

  echo "正在构建 VSIX..."
  npm run package:vsix
  VSIX_PATH="${SCRIPT_DIR}/ros2-cmake-completion-$(node -p "require('./package.json').version").vsix"
else
  if [[ "${VSIX_PATH}" != /* ]]; then
    VSIX_PATH="$(cd -- "$(dirname -- "${VSIX_PATH}")" && pwd)/$(basename -- "${VSIX_PATH}")"
  fi
fi

if [[ ! -f "${VSIX_PATH}" ]]; then
  echo "错误：找不到 VSIX 文件：${VSIX_PATH}" >&2
  exit 1
fi

echo "正在安装：${VSIX_PATH}"
code --install-extension "${VSIX_PATH}" --force

echo "ROS 2 CMake Completion 安装完成。请重新加载 VS Code 窗口。"
