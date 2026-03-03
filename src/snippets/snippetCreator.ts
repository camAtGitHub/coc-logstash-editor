import {
  CompletionItem,
  CompletionItemKind,
  InsertTextFormat,
  MarkupKind,
} from 'coc.nvim';

export function createSnippet(
  prefix: string,
  type: string,
  body: string,
  description: string,
  required?: boolean
): CompletionItem {

  let kind: CompletionItemKind;
  if (type === 'section')             kind = CompletionItemKind.Module;
  else if (type === 'plugin')         kind = CompletionItemKind.Interface;
  else if (type === 'option' && required) kind = CompletionItemKind.Method;
  else if (type === 'option')         kind = CompletionItemKind.Field;
  else if (type === 'common_option')  kind = CompletionItemKind.Constant;
  else if (type === 'keyword')        kind = CompletionItemKind.Keyword;
  else                                kind = CompletionItemKind.Value;

  const sortPrefix = (type === 'common_option') ? '2' : '1';
  const sortSuffix = required ? '1' : '2';

  // Plain object — NOT new CompletionItem() — coc.nvim CompletionItem is an interface
  const item: CompletionItem = {
    label:            prefix,
    kind,
    filterText:       prefix,
    insertText:       body,
    insertTextFormat: InsertTextFormat.Snippet,
    documentation: {
      kind:  MarkupKind.Markdown,   // plain LSP object, no constructor needed
      value: description,
    },
    sortText:         `${sortPrefix}${sortSuffix}-${prefix}`,
  };

  return item;
}
