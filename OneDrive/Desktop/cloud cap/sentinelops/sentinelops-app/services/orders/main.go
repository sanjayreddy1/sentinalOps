package main

import (
	"log"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusOK) })
	mux.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusOK) })
	mux.HandleFunc("/metrics", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain; version=0.0.4")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("orders_requests_total 1\n"))
	})
	mux.HandleFunc("/orders", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"orderId":"demo-1"}`))
	})

	srv := &http.Server{Addr: ":8080", Handler: mux, ReadTimeout: 10 * time.Second}
	log.Println("orders listening on :8080")
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("orders failed: %v", err)
	}
}
