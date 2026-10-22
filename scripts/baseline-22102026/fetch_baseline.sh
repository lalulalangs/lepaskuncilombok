#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STATUS_FILE="$DIR/status-26-url.txt"
HTML_DIR="$DIR/html"
mkdir -p "$HTML_DIR"

URLS=(
  "https://lepaskuncilombok.com/"
  "https://lepaskuncilombok.com/sewa-toyota-avanza-lombok/"
  "https://lepaskuncilombok.com/sewa-mobil-toyota-avanza-di-lombok-termurah/"
  "https://lepaskuncilombok.com/sewa-avanza-murah-lombok/"
  "https://lepaskuncilombok.com/sewa-innova-reborn-lombok-2/"
  "https://lepaskuncilombok.com/sewa-innova-reborn-lombok-dengan-harga-termurah/"
  "https://lepaskuncilombok.com/sewa-fortuner-lombok-2/"
  "https://lepaskuncilombok.com/sewa-fortuner-lombok-lepas-kunci-murah/"
  "https://lepaskuncilombok.com/sewa-fortuner-lombok/"
  "https://lepaskuncilombok.com/sewa-toyota-hiace-premio/"
  "https://lepaskuncilombok.com/sewa-hiace-premio-lombok/"
  "https://lepaskuncilombok.com/sewa-toyota-hiace-lombok/"
  "https://lepaskuncilombok.com/sewa-hiace-lombok/"
  "https://lepaskuncilombok.com/sewa-brio-lombok/"
  "https://lepaskuncilombok.com/sewa-mobil-brio-di-lombok-murah-2026/"
  "https://lepaskuncilombok.com/sewa-xpander-lombok/"
  "https://lepaskuncilombok.com/sewa-mobil-mitsubishi-xpander-di-lombok-2026/"
  "https://lepaskuncilombok.com/sewa-toyota-alphard-lombok/"
  "https://lepaskuncilombok.com/sewa-alphard-di-lombok/"
  "https://lepaskuncilombok.com/sewa-alphard-lombok/"
  "https://lepaskuncilombok.com/sewa-pajero-sport-lombok/"
  "https://lepaskuncilombok.com/sewa-mobil-pajero-di-lombok-harga-termurah/"
  "https://lepaskuncilombok.com/paket-wisata/"
  "https://lepaskuncilombok.com/paket-wisata-one-day-tour/"
  "https://lepaskuncilombok.com/armada-lepas-kunci-lombok/"
  "https://lepaskuncilombok.com/sewa-mobil-lombok-dengan-rating-tertinggi-dan-terpercaya/"
  "https://lepaskuncilombok.com/rental-mobil-lombok/"
)

echo "Timestamp: $(date -Iseconds)" > "$STATUS_FILE"
echo -e "URL\tHTTP_CODE\tREDIRECT_URL\tCONTENT_TYPE" >> "$STATUS_FILE"

for u in "${URLS[@]}"; do
  slug=$(echo "$u" | sed -E 's|https://lepaskuncilombok.com/?||' | sed 's|/|_|g')
  if [ -z "$slug" ]; then slug="homepage"; fi

  # Header check
  hdr=$(curl -sI -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "$u")
  code=$(echo "$hdr" | head -n 1 | awk '{print $2}')
  redir=$(echo "$hdr" | grep -i "^location:" | head -n 1 | awk '{print $2}' | tr -d '\r')
  ctype=$(echo "$hdr" | grep -i "^content-type:" | head -n 1 | awk '{print $2}' | tr -d '\r')

  echo -e "$u\t$code\t$redir\t$ctype" >> "$STATUS_FILE"

  # HTML snapshot (if 200 or following redirect)
  curl -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "$u" -o "$HTML_DIR/${slug}.html"
  echo "Processed: $slug ($code)"
done

echo "Done fetching baseline."
