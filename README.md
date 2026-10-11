# ROS 2 CMake 补全

这是一个 VS Code 扩展，为 ROS 2 `CMakeLists.txt` 和 `.cmake` 文件提供上下文补全。扩展会生成常用的 `ament_cmake`、`pluginlib` 和 `rclcpp_components` 代码片段，并支持通过 `Tab` 逐项填写参数。

## 功能

- 创建带 `ament_target_dependencies` 的可执行文件和库。
- 创建并注册可组合节点组件库。
- 注册 pluginlib 插件和安装插件 XML。
- 补全 ROS 2 目标、头文件、share 资源、包元数据和插件安装规则。
- 目标名、源码、依赖、包名和插件类名均支持 Tab 参数。

## 使用方法

1. 打开 `CMakeLists.txt` 或 `.cmake` 文件。
2. 输入补全前缀，例如 `ros2_add_executable`、`ros2_component_library`、`install` 或 `rclcpp_components`。
3. 选择补全项，然后按 `Tab` 依次填写参数。
4. 将占位值替换为当前 ROS 2 包中的实际名称。

常用前缀：

| 前缀 | 作用 |
| --- | --- |
| `ros2_add_executable` | 创建可执行文件并添加 ROS 2 依赖 |
| `ros2_component_library` | 创建并注册可组合节点库 |
| `rclcpp_components_register_nodes` | 注册一个或多个组件类 |
| `ros2_plugin_library` | 创建并注册 pluginlib 库 |
| `ros2_install_executable` | 将节点安装到 `lib/<package>` |
| `ros2_install_share_directory` | 将 launch、config、rviz、urdf 等目录一起安装 |
| `ros2_install_package_metadata` | 安装 `package.xml` 和 ament index 包标记 |

## 完整示例

典型的 ROS 2 可执行文件包可以使用下面的 `CMakeLists.txt`：

```cmake
cmake_minimum_required(VERSION 3.8)
project(example_nodes)

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(example_interfaces REQUIRED)

add_executable(talker_node
  src/talker.cpp
)

target_include_directories(talker_node PUBLIC
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include>
)

ament_target_dependencies(talker_node
  rclcpp
  example_interfaces
)

install(TARGETS talker_node
  DESTINATION lib/${PROJECT_NAME}
)

install(DIRECTORY
  launch
  config
  rviz
  DESTINATION share/${PROJECT_NAME}
)

install(DIRECTORY include/
  DESTINATION include
)

install(FILES package.xml
  DESTINATION share/${PROJECT_NAME}
)

install(FILES resource/${PROJECT_NAME}
  DESTINATION share/ament_index/resource_index/packages
)

ament_package()
```

## 组件示例

可组合节点应构建为共享库，并注册完整的命名空间类名：

```cmake
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(rclcpp_components REQUIRED)

add_library(example_component SHARED
  src/example_component.cpp
)

ament_target_dependencies(example_component
  rclcpp
  rclcpp_components
)

rclcpp_components_register_nodes(example_component
  "example_nodes::ExampleComponent"
)

install(TARGETS example_component
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION lib
)

ament_package()
```

C++ 类中还需要包含组件注册宏，例如：

```cpp
#include "rclcpp_components/register_node_macro.hpp"

RCLCPP_COMPONENTS_REGISTER_NODE(example_nodes::ExampleComponent)
```

## ROS 2 安装规范

- ROS 2 可执行文件安装到 `lib/${PROJECT_NAME}`，这样 `ros2 run` 才能找到它们。
- 共享库安装到 `lib`。
- 公共头文件安装到 `include`。
- launch、config、rviz、urdf 和其他包资源统一安装到 `share/${PROJECT_NAME}`。
- `package.xml` 安装到 `share/${PROJECT_NAME}`。
- 包标记安装到 `share/ament_index/resource_index/packages`。
- plugin XML 安装到 `share/${PROJECT_NAME}`，并使用相应的插件机制注册。
- 安装目标中优先使用 `${PROJECT_NAME}`，不要把包名硬编码。

## 开发和打包

```bash
npm install
npm run compile
npm run package:vsix
```

本地安装生成的 VSIX：

```bash
code --install-extension ros2-cmake-completion-0.0.1.vsix --force
```

## 发布到扩展市场

将 `package.json` 中的 `publisher` 设置为自己的 Marketplace Publisher ID，然后执行：

```bash
npx @vscode/vsce login <publisher-id>
npx @vscode/vsce publish
```

## 提交规范

本仓库使用 Conventional Commits：

```text
<type>(<可选范围>): <简短的祈使句主题>
```

常用类型：

| 类型 | 用途 |
| --- | --- |
| `feat` | 新增用户可见功能 |
| `fix` | 修复错误行为 |
| `docs` | 只修改文档 |
| `refactor` | 不改变行为的代码重构 |
| `test` | 新增或修改测试 |
| `build` | 修改构建、打包或发布配置 |
| `chore` | 其他维护性修改 |

示例：

```text
feat(completion): add ROS 2 component registration snippets
fix(install): use lib/<package> for executable targets
docs: add ROS 2 CMake usage examples
build: prepare VSIX packaging
```

提交标题要简短明确，使用祈使语气；一次提交只处理一个主题，不要混入无关修改。

## 许可证

MIT
