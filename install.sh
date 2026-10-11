#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
VSIX_PATH="${1:-}"
PACKAGE_ONLY="${PACKAGE_ONLY:-0}"

if [[ "${VSIX_PATH}" == "--package-only" ]]; then
  PACKAGE_ONLY=1
  VSIX_PATH=""
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

if [[ "${PACKAGE_ONLY}" == "1" ]]; then
  echo "VSIX 已生成：${VSIX_PATH}"
  echo "请在 VS Code 的 Remote/Dev Container 窗口中选择‘从 VSIX 安装’。"
  exit 0
fi

if ! command -v code >/dev/null 2>&1; then
  echo "未找到容器内的 code 命令。VSIX 已生成：${VSIX_PATH}"
  echo "请在 VS Code 的 Remote/Dev Container 窗口中执行："
  echo "1. 打开扩展面板"
  echo "2. 选择右上角‘...’ -> ‘从 VSIX 安装’"
  echo "3. 选择 ${VSIX_PATH}"
  echo "4. 确认安装到当前 Dev Container"
  exit 0
fi

echo "正在安装：${VSIX_PATH}"
code --install-extension "${VSIX_PATH}" --force

echo "ROS 2 CMake Completion 安装完成。请重新加载 VS Code 窗口。"
