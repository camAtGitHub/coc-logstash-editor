# coc-logstash-editor
Port of vscode-logstash-editor to CoC for NeoVim

## Installation

### 1. Install the extension
```
:CocInstall coc-logstash
```

### 2. Install coc-json and coc-yaml for schema validation
```
:CocInstall coc-json coc-yaml
```

### 3. Add filetype detection to your vimrc/init.vim
```vim
autocmd BufNewFile,BufRead *logstash.conf *logstash.conf.j2 *logstash.conf.template logstash-*.conf set filetype=logstash
```

Or symlink the bundled ftdetect file:
```sh
ln -s ~/.config/coc/extensions/node_modules/coc-logstash/vim/ftdetect/logstash.vim \
      ~/.vim/ftdetect/logstash.vim
```

### 4. (Optional) Keybinding to set Logstash version
```vim
" Add to vimrc:
autocmd FileType logstash nnoremap <buffer> <leader>lv
    \ :CocCommand config.commands.setLogstashVersion<CR>
```

### 5. (Optional) JSON/YAML schema validation
Add to coc-settings.json (`:CocConfig`):
```json
{
  "json.schemas": [
    {
      "fileMatch": ["*elasticsearch-template-es8x*.json"],
      "url": "~/.config/coc/extensions/node_modules/coc-logstash/jsonschemas/elasticsearch-template-es8x.schema.json"
    }
  ]
}
```

