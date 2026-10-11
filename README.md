# ROS 2 CMake Completion

Context-aware completion for ROS 2 `CMakeLists.txt` files. The extension inserts common `ament_cmake`, `pluginlib`, and `rclcpp_components` patterns as editable VS Code snippets.

## Features

- Executables and libraries with `ament_target_dependencies`.
- Composable node component libraries and registration macros.
- pluginlib library registration and plugin XML installation.
- ROS 2 target, header, share-resource, metadata, and plugin installation rules.
- Tab stops for target names, source files, dependencies, package names, and plugin classes.

## Usage

1. Open a `CMakeLists.txt` or `.cmake` file.
2. Type a completion prefix such as `ros2_add_executable`, `ros2_component_library`, `install`, or `rclcpp_components`.
3. Select a completion and press `Tab` to move through its parameters.
4. Replace placeholder values with the names used by your package.

The following prefixes are useful starting points:

| Prefix | Purpose |
| --- | --- |
| `ros2_add_executable` | Create an executable and add ROS 2 dependencies |
| `ros2_component_library` | Create and register a composable node library |
| `rclcpp_components_register_nodes` | Register one or more component classes |
| `ros2_plugin_library` | Create and register a pluginlib library |
| `ros2_install_executable` | Install a node under `lib/<package>` |
| `ros2_install_share_directory` | Install launch, config, rviz, and urdf directories together |
| `ros2_install_package_metadata` | Install `package.xml` and the ament index marker |

## Complete Example

A typical executable package can use the following structure:

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

## Component Example

For a composable node, build a shared library and register the fully qualified class name:

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

The C++ class must include the component registration macro, for example:

```cpp
#include "rclcpp_components/register_node_macro.hpp"

RCLCPP_COMPONENTS_REGISTER_NODE(example_nodes::ExampleComponent)
```

## Installation Conventions

- Install ROS 2 executables to `lib/${PROJECT_NAME}` so that `ros2 run` can find them.
- Install shared libraries to `lib`.
- Install public headers to `include`.
- Install launch, config, rviz, urdf, and other package resources together to `share/${PROJECT_NAME}`.
- Install `package.xml` to `share/${PROJECT_NAME}`.
- Install the package marker to `share/ament_index/resource_index/packages`.
- Install plugin XML files to `share/${PROJECT_NAME}` and register them with the appropriate plugin mechanism.
- Use `${PROJECT_NAME}` instead of hard-coding the package name in install destinations.

## Development

```bash
npm install
npm run compile
npm run package:vsix
```

The generated file can be installed locally with:

```bash
code --install-extension ros2-cmake-completion-0.0.1.vsix
```

## Publishing

Set the `publisher` field in `package.json` to your Marketplace Publisher ID, then authenticate and publish:

```bash
npx @vscode/vsce login <publisher-id>
npx @vscode/vsce publish
```

## License

MIT
