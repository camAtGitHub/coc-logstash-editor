" Logstash pipeline configuration file detection
" Shipped with coc-logstash — symlink or copy to ~/.vim/ftdetect/
augroup logstash_filetype
  autocmd!
  autocmd BufNewFile,BufRead *logstash.conf           set filetype=logstash
  autocmd BufNewFile,BufRead *logstash.conf.j2        set filetype=logstash
  autocmd BufNewFile,BufRead *logstash.conf.template  set filetype=logstash
  autocmd BufNewFile,BufRead logstash-*.conf          set filetype=logstash
augroup END
