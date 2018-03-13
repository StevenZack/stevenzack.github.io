package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, r.RemoteAddr)
	})
	e := http.ListenAndServe(":80", nil)
	if e != nil {
		fmt.Println(e)
		return
	}
}
