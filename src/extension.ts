// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
type CompletionDefinition = {
	label: string;
	detail: string;
	documentation: string;
	insertText: string;
	keywords: string[];
};

const completions: CompletionDefinition[] = [
	{
		label: 'ros2_add_executable',
		detail: 'ROS 2 executable target',
		documentation: 'Creates an executable and connects it to common ROS 2 dependencies.',
		insertText: 'add_executable(${1:target_name}\n  ${2:src/main.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:rclcpp}\n)',
		keywords: ['ros2_add_executable', 'add_executable']
	},
	{
		label: 'ros2_add_library',
		detail: 'ROS 2 library target',
		documentation: 'Creates a library target with the usual ROS 2 dependency hook.',
		insertText: 'add_library(${1:target_name} SHARED\n  ${2:src/source.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:rclcpp}\n)',
		keywords: ['ros2_add_library', 'add_library']
	},
	{
		label: 'ros2_plugin_library',
		detail: 'Build and register a ROS 2 plugin library',
		documentation: 'Creates, installs, and exports a plugin library through pluginlib.',
		insertText: 'add_library(${1:plugin_name} SHARED\n  ${2:src/plugin.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:pluginlib}\n)\n\npluginlib_export_plugin_description_file(${4:base_package} ${5:plugin_description.xml})\n\ninstall(TARGETS ${1}\n  ARCHIVE DESTINATION lib\n  LIBRARY DESTINATION lib\n  RUNTIME DESTINATION lib/\\${PROJECT_NAME}\n)\n\ninstall(FILES ${5}\n  DESTINATION share/\\${PROJECT_NAME}\n)',
		keywords: ['ros2_plugin_library', 'plugin_library', 'plugin']
	},
	{
		label: 'ros2_plugin_executable',
		detail: 'Build and install a ROS 2 executable',
		documentation: 'Creates an executable, links ROS 2 dependencies, and installs it under lib/<package>.',
		insertText: 'add_executable(${1:executable_name}\n  ${2:src/main.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:rclcpp}\n)\n\ninstall(TARGETS ${1}\n  DESTINATION lib/\\${PROJECT_NAME}\n)',
		keywords: ['ros2_plugin_executable', 'ros2_executable', 'executable']
	},
	{
		label: 'ros2_component_library',
		detail: 'Build and register a composable ROS 2 node library',
		documentation: 'Creates a shared component library, registers one or more node classes, and installs it.',
		insertText: 'add_library(${1:component_name} SHARED\n  ${2:src/component.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:rclcpp}\n  rclcpp_components\n)\n\nrclcpp_components_register_nodes(${1}\n  "${4:my_namespace::MyComponent}"\n)\n\ninstall(TARGETS ${1}\n  ARCHIVE DESTINATION lib\n  LIBRARY DESTINATION lib\n  RUNTIME DESTINATION lib/\\${PROJECT_NAME}\n)',
		keywords: ['ros2_component_library', 'component_library', 'component']
	},
	{
		label: 'rclcpp_components_register_nodes',
		detail: 'Register composable ROS 2 node classes',
		documentation: 'Registers one or more classes in a component library for runtime composition.',
		insertText: 'rclcpp_components_register_nodes(${1:component_target}\n  "${2:my_namespace::MyComponent}"\n)',
		keywords: ['rclcpp_components_register_nodes', 'register_nodes', 'component_register']
	},
	{
		label: 'rclcpp_components_register_node',
		detail: 'Register one component with an executable',
		documentation: 'Registers a component class and optionally creates a standalone executable for it.',
		insertText: 'rclcpp_components_register_node(${1:component_target}\n  PLUGIN "${2:my_namespace::MyComponent}"\n  EXECUTABLE "${3:my_component_node}"\n)',
		keywords: ['rclcpp_components_register_node', 'register_node', 'component_executable']
	},
	{
		label: 'find_package(rclcpp_components)',
		detail: 'Find the ROS 2 component framework',
		documentation: 'Provides the CMake macros used to register composable nodes.',
		insertText: 'find_package(rclcpp_components REQUIRED)',
		keywords: ['find_package', 'rclcpp_components', 'components']
	},
	{
		label: 'ament_target_dependencies',
		detail: 'Declare ament target dependencies',
		documentation: 'Adds packages exported by ament to a target.',
		insertText: 'ament_target_dependencies(${1:target_name}\n  ${2:rclcpp}\n  ${3:additional_dependency}\n)',
		keywords: ['ament_target_dependencies', 'dependencies']
	},
	{
		label: 'ament_target_include',
		detail: 'Configure ROS 2 target include directories',
		documentation: 'Adds build and install include paths to a target.',
		insertText: 'target_include_directories(${1:target_name} PUBLIC\n  $<BUILD_INTERFACE:\\${CMAKE_CURRENT_SOURCE_DIR}/include>\n  $<INSTALL_INTERFACE:include>\n)',
		keywords: ['ament_target_include', 'target_include_directories', 'include']
	},
	{
		label: 'find_package(ament_cmake)',
		detail: 'Find the ament CMake build system',
		documentation: 'Required by most ROS 2 CMake packages.',
		insertText: 'find_package(ament_cmake REQUIRED)',
		keywords: ['find_package', 'ament_cmake']
	},
	{
		label: 'ros2_interface_package',
		detail: 'Configure a ROS 2 interface package',
		documentation: 'Finds the rosidl generator, generates msg/srv/action interfaces, and exports the runtime dependency.',
		insertText: 'find_package(ament_cmake REQUIRED)\nfind_package(rosidl_default_generators REQUIRED)\n\nrosidl_generate_interfaces(\\${PROJECT_NAME}\n  "${1:msg/Example.msg}"\n  "${2:srv/Example.srv}"\n  "${3:action/Example.action}"\n  DEPENDENCIES\n    ${4:std_msgs}\n)\n\nament_export_dependencies(rosidl_default_runtime)\nament_package()',
		keywords: ['ros2_interface_package', 'interface_package', 'rosidl']
	},
	{
		label: 'rosidl_generate_interfaces',
		detail: 'Generate ROS 2 message, service, or action interfaces',
		documentation: 'Generates code and type support from .msg, .srv, and .action files.',
		insertText: 'rosidl_generate_interfaces(\\${PROJECT_NAME}\n  "${1:msg/Example.msg}"\n  "${2:srv/Example.srv}"\n  "${3:action/Example.action}"\n  DEPENDENCIES\n    ${4:std_msgs}\n)',
		keywords: ['rosidl_generate_interfaces', 'generate_interfaces', 'interface']
	},
	{
		label: 'rosidl_generate_msg',
		detail: 'Generate a ROS 2 message interface',
		documentation: 'Adds a .msg interface file to the package interface generation step.',
		insertText: 'rosidl_generate_interfaces(\\${PROJECT_NAME}\n  "${1:msg/Example.msg}"\n)',
		keywords: ['rosidl_generate_msg', 'generate_msg', 'msg']
	},
	{
		label: 'rosidl_generate_srv',
		detail: 'Generate a ROS 2 service interface',
		documentation: 'Adds a .srv interface file to the package interface generation step.',
		insertText: 'rosidl_generate_interfaces(\\${PROJECT_NAME}\n  "${1:srv/Example.srv}"\n)',
		keywords: ['rosidl_generate_srv', 'generate_srv', 'srv']
	},
	{
		label: 'rosidl_generate_action',
		detail: 'Generate a ROS 2 action interface',
		documentation: 'Adds an .action interface file to the package interface generation step.',
		insertText: 'rosidl_generate_interfaces(\\${PROJECT_NAME}\n  "${1:action/Example.action}"\n)',
		keywords: ['rosidl_generate_action', 'generate_action', 'action']
	},
	{
		label: 'find_package(rosidl_default_generators)',
		detail: 'Find ROS 2 interface generators',
		documentation: 'Provides rosidl_generate_interfaces for building message, service, and action definitions.',
		insertText: 'find_package(rosidl_default_generators REQUIRED)',
		keywords: ['find_package', 'rosidl_default_generators', 'interface_generators']
	},
	{
		label: 'find_package(rosidl_default_runtime)',
		detail: 'Find ROS 2 interface runtime support',
		documentation: 'Provides runtime type support for generated interfaces.',
		insertText: 'find_package(rosidl_default_runtime REQUIRED)',
		keywords: ['find_package', 'rosidl_default_runtime', 'interface_runtime']
	},
	{
		label: 'ament_export_dependencies(rosidl_default_runtime)',
		detail: 'Export generated interface runtime support',
		documentation: 'Makes generated interface type support available to downstream packages.',
		insertText: 'ament_export_dependencies(rosidl_default_runtime)',
		keywords: ['ament_export_dependencies', 'rosidl_default_runtime', 'export_interfaces']
	},
	{
		label: 'ament_export_dependencies',
		detail: 'Export ROS 2 package dependencies',
		documentation: 'Makes dependencies available to packages that depend on this package.',
		insertText: 'ament_export_dependencies(\n  ${1:rclcpp}\n  ${2:additional_dependency}\n)',
		keywords: ['ament_export_dependencies', 'export_dependencies', 'export']
	},
	{
		label: 'ament_export_include_directories',
		detail: 'Export public include directories',
		documentation: 'Exports public headers for downstream ROS 2 packages.',
		insertText: 'ament_export_include_directories(${1:include})',
		keywords: ['ament_export_include_directories', 'export_include', 'export_headers']
	},
	{
		label: 'ament_export_libraries',
		detail: 'Export libraries',
		documentation: 'Exports library targets for downstream ROS 2 packages.',
		insertText: 'ament_export_libraries(\n  ${1:library_target}\n)',
		keywords: ['ament_export_libraries', 'export_libraries', 'export_library']
	},
	{
		label: 'ament_export_targets',
		detail: 'Export modern CMake targets',
		documentation: 'Exports an install target set with its library target available to downstream packages.',
		insertText: 'ament_export_targets(${1:export_name} HAS_LIBRARY_TARGET)',
		keywords: ['ament_export_targets', 'export_targets', 'cmake_targets']
	},
	{
		label: 'install(EXPORT)',
		detail: 'Install an exported CMake target set',
		documentation: 'Installs target metadata so downstream packages can import the library targets.',
		insertText: 'install(EXPORT ${1:export_name}\n  FILE ${2:${1}Targets.cmake}\n  DESTINATION share/\\${PROJECT_NAME}/cmake\n)',
		keywords: ['install_export', 'install(EXPORT)', 'export_targets']
	},
	{
		label: 'ros2_export_library',
		detail: 'Install and export a ROS 2 library',
		documentation: 'Installs a library, headers, CMake targets, and package exports for downstream use.',
		insertText: 'install(TARGETS ${1:library_target}\n  EXPORT ${2:export_name}\n  ARCHIVE DESTINATION lib\n  LIBRARY DESTINATION lib\n  RUNTIME DESTINATION lib\n)\n\ninstall(DIRECTORY ${3:include}/\n  DESTINATION include\n)\n\ninstall(EXPORT ${2}\n  FILE ${4:${2}Targets.cmake}\n  DESTINATION share/\\${PROJECT_NAME}/cmake\n)\n\nament_export_targets(${2} HAS_LIBRARY_TARGET)\nament_export_include_directories(include)',
		keywords: ['ros2_export_library', 'export_library', 'library_export']
	},
	{
		label: 'find_package(ROS 2 dependency)',
		detail: 'Find a ROS 2 package dependency',
		documentation: 'Looks up a ROS 2 package exported through the ament index.',
		insertText: 'find_package(${1:rclcpp} REQUIRED)',
		keywords: ['find_package', 'ros2_dependency']
	},
	{
		label: 'ament_export_dependencies',
		detail: 'Export package dependencies',
		documentation: 'Makes dependencies available to downstream packages.',
		insertText: 'ament_export_dependencies(${1:rclcpp})',
		keywords: ['ament_export_dependencies', 'export_dependencies']
	},
	{
		label: 'install(TARGETS)',
		detail: 'Install a ROS 2 target',
		documentation: 'Installs an executable or library into the standard ROS 2 package layout.',
		insertText: 'install(TARGETS ${1:target_name}\n  DESTINATION lib/${2:\\${PROJECT_NAME}}\n)',
		keywords: ['install', 'install_targets', 'target']
	},
	{
		label: 'install(DIRECTORY)',
		detail: 'Install headers or resource directories',
		documentation: 'Installs a package directory, commonly include/ or resource/.',
		insertText: 'install(DIRECTORY ${1:include}/\n  DESTINATION ${2:include}\n)',
		keywords: ['install', 'install_directory', 'directory', 'headers']
	},
	{
		label: 'ros2_install_library',
		detail: 'Install a ROS 2 shared library',
		documentation: 'Installs a shared or static library under lib, which is the standard ament layout for libraries.',
		insertText: 'install(TARGETS ${1:library_target}\n  ARCHIVE DESTINATION lib\n  LIBRARY DESTINATION lib\n  RUNTIME DESTINATION lib\n)',
		keywords: ['ros2_install_library', 'install_library', 'library']
	},
	{
		label: 'ros2_install_executable',
		detail: 'Install a ROS 2 executable',
		documentation: 'Installs a node executable under lib/<package>, as expected by ros2 run.',
		insertText: 'install(TARGETS ${1:executable_target}\n  DESTINATION lib/${2:\\${PROJECT_NAME}}\n)',
		keywords: ['ros2_install_executable', 'install_executable', 'executable']
	},
	{
		label: 'ros2_install_share_directory',
		detail: 'Install multiple ROS 2 package resource directories',
		documentation: 'Installs launch, config, rviz, urdf, or other package resources together under share/<package>.',
		insertText: 'install(DIRECTORY\n  ${1:launch}\n  ${2:config}\n  ${3:rviz}\n  ${4:urdf}\n  DESTINATION share/${5:\\${PROJECT_NAME}}\n)',
		keywords: ['ros2_install_share_directory', 'install_share', 'launch', 'config']
	},
	{
		label: 'ros2_install_share_files',
		detail: 'Install package resource files into share',
		documentation: 'Installs resource files such as YAML, RViz, or launch files directly under share/<package>.',
		insertText: 'install(FILES\n  ${1:config/params.yaml}\n  ${2:rviz/view.rviz}\n  DESTINATION share/${3:\\${PROJECT_NAME}}\n)',
		keywords: ['ros2_install_share_files', 'install_share_files', 'share_files']
	},
	{
		label: 'ros2_install_include_directory',
		detail: 'Install public C++ headers',
		documentation: 'Installs the package include directory to the global include prefix.',
		insertText: 'install(DIRECTORY ${1:include}/\n  DESTINATION include\n)',
		keywords: ['ros2_install_include_directory', 'install_include', 'headers']
	},
	{
		label: 'ros2_install_package_metadata',
		detail: 'Install package.xml and ament resource marker',
		documentation: 'Installs the metadata required for package discovery and the ament index.',
		insertText: 'install(FILES package.xml\n  DESTINATION share/${1:\\${PROJECT_NAME}}\n)\n\ninstall(FILES resource/${1}\n  DESTINATION share/ament_index/resource_index/packages\n)',
		keywords: ['ros2_install_package_metadata', 'install_metadata', 'package_xml', 'resource_index']
	},
	{
		label: 'ros2_install_plugin_description',
		detail: 'Install a plugin XML description',
		documentation: 'Installs a plugin description file where pluginlib can discover it.',
		insertText: 'install(FILES ${1:plugin_description.xml}\n  DESTINATION share/${2:\\${PROJECT_NAME}}\n)',
		keywords: ['ros2_install_plugin_description', 'install_plugin', 'plugin_xml']
	},
	{
		label: 'pluginlib_export_plugin_description_file',
		detail: 'Register a pluginlib description file',
		documentation: 'Exports a plugin XML description through the ament index.',
		insertText: 'pluginlib_export_plugin_description_file(${1:plugin_base_package} ${2:plugin_description.xml})',
		keywords: ['pluginlib_export_plugin_description_file', 'plugin', 'register_plugin']
	},
	{
		label: 'ament_index_register_resource',
		detail: 'Register an ament index resource',
		documentation: 'Registers custom package metadata for runtime discovery.',
		insertText: 'ament_index_register_resource(${1:resource_type}\n  CONTENT "${2:resource_content}"\n)',
		keywords: ['ament_index_register_resource', 'register', 'resource']
	},
	{
		label: 'ament_package',
		detail: 'Finalize an ament package',
		documentation: 'Usually the final command in a ROS 2 CMakeLists.txt file.',
		insertText: 'ament_package()',
		keywords: ['ament_package', 'package']
	}
];

class Ros2CmakeCompletionProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
		const linePrefix = document.lineAt(position.line).text.slice(0, position.character);
		const match = linePrefix.match(/[A-Za-z_][A-Za-z0-9_-]*$/);
		const typed = match?.[0].toLowerCase() ?? '';
		const wordStart = position.character - typed.length;
		const range = new vscode.Range(position.line, wordStart, position.line, position.character);

		return completions
			.filter((completion) => typed.length === 0 || completion.keywords.some((keyword) => keyword.startsWith(typed)))
			.map((completion) => {
				const item = new vscode.CompletionItem(completion.label, vscode.CompletionItemKind.Function);
				item.detail = completion.detail;
				item.documentation = new vscode.MarkdownString(completion.documentation);
				item.insertText = new vscode.SnippetString(completion.insertText);
				item.range = range;
				item.filterText = completion.keywords.find((keyword) => keyword.startsWith(typed)) ?? completion.label;
				return item;
			});
	}
}

export function activate(context: vscode.ExtensionContext): void {
	const provider = vscode.languages.registerCompletionItemProvider(
		[
			{ language: 'cmake', scheme: 'file' },
			{ pattern: '**/CMakeLists.txt' },
			{ pattern: '**/*.cmake' }
		],
		new Ros2CmakeCompletionProvider(),
		'_',
		'('
	);

	context.subscriptions.push(provider);
}

export function deactivate() {}
