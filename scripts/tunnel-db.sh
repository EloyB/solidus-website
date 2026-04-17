#!/usr/bin/env bash
set -euo pipefail

LOCAL_PORT=5435
REMOTE_PORT=5432

# Load env vars from .env if present
ENV_FILE="$(dirname "$0")/../.env"
if [[ -f "$ENV_FILE" ]]; then
  SCALEWAY_SSH_HOST="${SCALEWAY_SSH_HOST:-$(grep -E '^SCALEWAY_SSH_HOST=' "$ENV_FILE" 2>/dev/null | cut -d= -f2-)}"
  SCALEWAY_SSH_USER="${SCALEWAY_SSH_USER:-$(grep -E '^SCALEWAY_SSH_USER=' "$ENV_FILE" 2>/dev/null | cut -d= -f2-)}"
fi

# Allow override via CLI arg: ./tunnel-db.sh user@host
if [[ "${1:-}" ]]; then
  SCALEWAY_SSH_USER="${1%%@*}"
  SCALEWAY_SSH_HOST="${1##*@}"
fi

if [[ -z "${SCALEWAY_SSH_HOST:-}" || -z "${SCALEWAY_SSH_USER:-}" ]]; then
  echo "Error: SCALEWAY_SSH_HOST and SCALEWAY_SSH_USER must be set."
  echo ""
  echo "Set them in .env, export them, or pass as argument:"
  echo "  ./scripts/tunnel-db.sh user@host"
  exit 1
fi

cleanup() {
  echo ""
  echo "Tunnel closed."
}
trap cleanup EXIT

echo "Opening SSH tunnel to production PostgreSQL..."
echo "  Remote: ${SCALEWAY_SSH_USER}@${SCALEWAY_SSH_HOST}:${REMOTE_PORT}"
echo "  Local:  localhost:${LOCAL_PORT}"
echo ""
echo "Connect with:"
echo "  psql postgres://payload:<password>@localhost:${LOCAL_PORT}/solidus-website"
echo ""
echo "Press Ctrl+C to close the tunnel."
echo ""

ssh -N -L "${LOCAL_PORT}:localhost:${REMOTE_PORT}" "${SCALEWAY_SSH_USER}@${SCALEWAY_SSH_HOST}"
