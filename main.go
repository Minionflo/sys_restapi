package main

import (
	"fmt"
	"internal/cpu"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func handler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	if r.URL.Path == "/cpu/temp" {
		raw1, err := ioutil.ReadFile(os.Getenv("cpu_temp_path"))
		raw2 := string(raw1)
		raw3 := strings.ReplaceAll(raw2, "\n", "")
		raw4, err := strconv.ParseFloat(string(raw3), 64)
		raw5 := raw4 * 0.001
		result := fmt.Sprintf("%v", raw5)
		if err != nil {
			http.Error(w, "500 Internal server error", http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, result)
	}
	if r.URL.Path == "/cpu/freq" {

	}
	if r.URL.Path == "/cpu/model" {
		result := cpu.Name()
		fmt.Fprintf(w, result)
	}
	if r.URL.Path == "/uptime" {

	}
	if r.URL.Path == "/mem/free" {

	}
	if r.URL.Path == "/mem/available" {

	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}
}

func main() {
	os.Setenv("cpu_temp_path", "")
	http.HandleFunc("/", handler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
