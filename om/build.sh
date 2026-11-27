#!/bin/sh
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
OMC=${OMC:-"$HOME/.local/bin/omc"}
if [ ! -x "$OMC" ]; then
  echo "missing omc at $OMC" >&2
  exit 2
fi

WORK=$(mktemp -d "${TMPDIR:-/tmp}/astral-om.XXXXXX")
trap 'rm -rf "$WORK"' 0

OS=$(uname -s)
if [ "$OS" = "Darwin" ]; then
  cat "$ROOT/om/hdr_macos.om" "$ROOT/om/astral_core.om" > "$WORK/unit.om"
else
  cat "$ROOT/om/hdr_linux.om" "$ROOT/om/astral_core.om" > "$WORK/unit.om"
fi

"$OMC" < "$WORK/unit.om" > "$WORK/astral-cosmos-gen"
chmod +x "$WORK/astral-cosmos-gen"
if [ "$OS" = "Darwin" ]; then
  codesign -s - -f "$WORK/astral-cosmos-gen" >/dev/null 2>&1
fi

"$WORK/astral-cosmos-gen" > "$WORK/out1.om3d"
"$WORK/astral-cosmos-gen" > "$WORK/out2.om3d"
cmp -s "$WORK/out1.om3d" "$WORK/out2.om3d"

mkdir -p "$ROOT/dist"
mv -f "$WORK/out1.om3d" "$ROOT/dist/astral-cosmos.om3d"
if command -v shasum >/dev/null 2>&1; then
  HASH=$(shasum -a 256 "$ROOT/dist/astral-cosmos.om3d" | awk '{print $1}')
else
  HASH=$(sha256sum "$ROOT/dist/astral-cosmos.om3d" | awk '{print $1}')
fi
printf '%s  astral-cosmos.om3d\n' "$HASH" > "$ROOT/dist/astral-cosmos.om3d.sha256"
echo "OM3D_BUILD_OK bytes=$(wc -c < "$ROOT/dist/astral-cosmos.om3d" | tr -d ' ') sha256=$HASH"
