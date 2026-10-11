# ROS 2 CMake Completion

Context-aware completion for ROS 2 `CMakeLists.txt` files.

## Features

- Type `ros2_add_executable` to insert `add_executable` plus `ament_target_dependencies`.
- Type `ament_target_include` to insert build and install include directories.
- Type `install` to insert target and directory installation rules.
- Use `ros2_install_executable`, `ros2_install_library`, and `ros2_install_share_directory` for the standard `lib` and `share` layout.
- Share resources such as `launch`, `config`, `rviz`, and `urdf` are installed together into `share/${PROJECT_NAME}`.
- Installation snippets expose target names, source directories, package names, and destination subdirectories as Tab parameters.
- Type `plugin` or `register` to register pluginlib descriptions and ament index resources.
- Type `ros2_plugin_library` to create, install, and register a plugin library.
- Type `ros2_plugin_executable` to create and install a ROS 2 executable target.
- Type `ros2_component_library` to create and register a composable node library.
- Complete `rclcpp_components_register_nodes` or `rclcpp_components_register_node` for component registration.
- Generated ROS 2 executables are installed to `lib/${PROJECT_NAME}`, not `bin`.
- Complete `find_package`, `ament_export_dependencies`, and `ament_package` snippets.
- Works in `CMakeLists.txt` and `.cmake` files using the CMake language mode.

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
