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
		insertText: 'add_library(${1:plugin_name} SHARED\n  ${2:src/plugin.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:pluginlib}\n)\n\npluginlib_export_plugin_description_file(${4:base_package} ${5:plugin_description.xml})\n\ninstall(TARGETS ${1}\n  ARCHIVE DESTINATION lib\n  LIBRARY DESTINATION lib\n  RUNTIME DESTINATION lib/${PROJECT_NAME}\n)',
		keywords: ['ros2_plugin_library', 'plugin_library', 'plugin']
	},
	{
		label: 'ros2_plugin_executable',
		detail: 'Build and install a ROS 2 executable',
		documentation: 'Creates an executable, links ROS 2 dependencies, and installs it under lib/<package>.',
		insertText: 'add_executable(${1:executable_name}\n  ${2:src/main.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:rclcpp}\n)\n\ninstall(TARGETS ${1}\n  DESTINATION lib/${PROJECT_NAME}\n)',
		keywords: ['ros2_plugin_executable', 'ros2_executable', 'executable']
	},
	{
		label: 'ros2_component_library',
		detail: 'Build and register a composable ROS 2 node library',
		documentation: 'Creates a shared component library, registers one or more node classes, and installs it.',
		insertText: 'add_library(${1:component_name} SHARED\n  ${2:src/component.cpp}\n)\n\nament_target_dependencies(${1}\n  ${3:rclcpp}\n  rclcpp_components\n)\n\nrclcpp_components_register_nodes(${1}\n  "${4:my_namespace::MyComponent}"\n)\n\ninstall(TARGETS ${1}\n  ARCHIVE DESTINATION lib\n  LIBRARY DESTINATION lib\n  RUNTIME DESTINATION lib/${PROJECT_NAME}\n)',
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
		insertText: 'target_include_directories(${1:target_name} PUBLIC\n  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>\n  $<INSTALL_INTERFACE:include>\n)',
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
		insertText: 'install(TARGETS ${1:target_name}\n  ARCHIVE DESTINATION lib\n  LIBRARY DESTINATION lib\n  RUNTIME DESTINATION lib/${PROJECT_NAME}\n)',
		keywords: ['install', 'install_targets', 'target']
	},
	{
		label: 'install(DIRECTORY)',
		detail: 'Install headers or resource directories',
		documentation: 'Installs a package directory, commonly include/ or resource/.',
		insertText: 'install(DIRECTORY ${1:include}/\n  DESTINATION include\n)',
		keywords: ['install', 'install_directory', 'directory', 'headers']
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
