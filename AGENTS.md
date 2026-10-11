# AGENTS.md

## 项目说明

`ros2-cmake-completion` 是一个 VS Code 扩展，为 ROS 2 的 `CMakeLists.txt` 和 `.cmake` 文件提供基于代码片段的补全。

## 仓库结构

- `src/extension.ts`：补全定义和 VS Code 补全提供器。
- `src/test/`：扩展测试。
- `dist/`：生产构建产物，不要手动编辑。
- `.vscode/`：扩展开发用的启动和任务配置。
- `README.md`：面向用户的使用说明、ROS 2 示例和规范。
- `package.json`：扩展元数据和 npm 脚本。

## 开发命令

在仓库根目录执行：

```bash
npm install
npm run compile
npm run package:vsix
```

`npm run compile` 会执行 TypeScript 类型检查、ESLint 和 esbuild。每次修改源代码后都应执行该命令。`npm run package:vsix` 会生成可本地安装的 VSIX 文件。

本地安装生成的 VSIX：

```bash
code --install-extension ros2-cmake-completion-0.0.1.vsix --force
```

## 实现规范

- 补全定义放在 `src/extension.ts` 中，除非新增抽象确实能够减少重复代码。
- 用户可编辑的值使用 `vscode.SnippetString` 和编号制表位。
- snippet 中的 CMake 变量必须转义，例如 `\\${PROJECT_NAME}` 和 `\\${CMAKE_CURRENT_SOURCE_DIR}`，以便插入后仍保留为 CMake 变量。
- 遵循 ROS 2 `ament_cmake` 约定：
  - 可执行文件安装到 `lib/${PROJECT_NAME}`；
  - 库安装到 `lib`；
  - 头文件安装到 `include`；
  - launch、config、rviz、urdf、plugin XML 等资源安装到 `share/${PROJECT_NAME}`；
  - 包标记安装到 `share/ament_index/resource_index/packages`。
- ROS 2 包的可执行文件不要使用 `DESTINATION bin`。
- snippet 应保持可组合，并将目标名、源码路径、包名、依赖和类名暴露为制表位参数。
- 避免无关重构，不要提交生成的 `dist/`、`out/`、`.vscode-test/` 或 `node_modules/` 文件。

## 验证

提交源代码或文档修改前执行：

```bash
npm run compile
git diff --check
```

修改测试行为或扩展激活逻辑时运行 `npm test`。macOS 上集成测试可能因为 IPC socket 路径超过系统限制而失败；遇到这种情况，应将其作为测试基础设施问题单独说明，而不是误判为代码失败。

## 提交规范

本仓库使用 Conventional Commits：

```text
<type>(<可选范围>): <简短的祈使句主题>
```

常用类型：

- `feat`：新增用户可见功能。
- `fix`：修复错误行为。
- `docs`：只修改文档。
- `refactor`：不改变行为的代码重构。
- `test`：新增或修改测试。
- `build`：修改构建、打包或发布配置。
- `chore`：不影响用户的维护性修改。

示例：

```text
feat(completion): add ROS 2 component registration snippets
fix(install): use lib/<package> for executable targets
docs: add ROS 2 CMake usage examples
build: prepare VSIX packaging
```

提交主题应简短、明确、使用祈使语气。一次提交只处理一个主题，不要混入无关修改。只有在公共行为确实发生不兼容变化时，才添加 breaking-change footer。

## 安全要求

- 不要提交 Personal Access Token、SSH 私钥或其他敏感信息。
- 未经明确要求，不要重写共享历史或强制推送。
- 修改 Marketplace 的 `publisher` 字段前，必须确认目标 Publisher ID。
