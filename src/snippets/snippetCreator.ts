import {
	CompletionItem,
	CompletionItemKind,
	SnippetString,
	MarkdownString,
} from 'coc.nvim';

export function createSnippet(prefix: string, type: string, body: string, description: string, required?: boolean): CompletionItem {

	// define snippet kind
	let kind: CompletionItemKind;
	if (type === 'section') {
		kind = CompletionItemKind.Module;
	}
	else if (type === 'plugin') {
		kind = CompletionItemKind.Interface;
	}
	else if (type === 'option' && required) {
		kind = CompletionItemKind.Method;
	}
	else if (type === 'option') {
		kind = CompletionItemKind.Field;
	}
	else if (type === 'common_option') {
		kind = CompletionItemKind.Constant;
	}
	else if (type === 'keyword') {
		kind = CompletionItemKind.Keyword;
	}
	else {
		kind = CompletionItemKind.Value;
	}

	const snippet = new CompletionItem(prefix, kind);
	snippet.filterText = prefix;
	snippet.insertText = new SnippetString(body);
	snippet.documentation = new MarkdownString(description);

	let sortPrefix = (type === 'common_option') ? '2' : '1';
	sortPrefix += (required) ? '1' : '2';
	snippet.sortText = `${sortPrefix}-${prefix}`;

	return snippet;
}
