# Finds the process under the port and kills it - useful for "ghosted" processes
stop-process -id (get-nettcpconnection -localport 666).owningprocess -force