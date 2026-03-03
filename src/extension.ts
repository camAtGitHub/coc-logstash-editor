import {
	ExtensionContext,
	languages,
	commands,
	workspace,
} from 'coc.nvim';

import {
	logstashCompletionItemProvider,
	logstashHoverProvider,
} from './editor';

import {
	logstashDocumentFormattingEditProvider,
	logstashDocumentRangeFormattingEditProvider,
} from './formattingProvider';

import {
	setLogstashVersionCommandCallback,
	SET_LOGSTASH_VERSION_COMMAND_NAME,
} from './snippets/snippetsProvider';

const LOGSTASH_LANGUAGE = 'logstash';

export async function activate(context: ExtensionContext): Promise<void> {
	// Respect enabled/disabled configuration
	const config = workspace.getConfiguration('coc-logstash');
	if (!config.get<boolean>('enabled', true)) {
		return;
	}

	context.subscriptions.push(
		// Completion: (id, label, documentSelector, provider, triggerCharacters)
		languages.registerCompletionItemProvider(
			'coc-logstash-completion',
			'LS',
			LOGSTASH_LANGUAGE,
			logstashCompletionItemProvider,
			[]
		),

		// Hover: (selector, provider)
		languages.registerHoverProvider(
			[{ language: LOGSTASH_LANGUAGE }],
			logstashHoverProvider
		),

		// Document format: (selector, provider, priority?)
		languages.registerDocumentFormatProvider(
			[{ language: LOGSTASH_LANGUAGE }],
			logstashDocumentFormattingEditProvider,
			1
		),

		// Range format: (selector, provider, priority?)
		languages.registerDocumentRangeFormatProvider(
			[{ language: LOGSTASH_LANGUAGE }],
			logstashDocumentRangeFormattingEditProvider,
			1
		),

		// Set Logstash version command
		commands.registerCommand(
			SET_LOGSTASH_VERSION_COMMAND_NAME,
			setLogstashVersionCommandCallback
		)
	);
}
