#!/usr/bin/env python3
from __future__ import annotations

import argparse


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Run LD interactive web UI (FastAPI + JS).")
    p.add_argument("--host", default="127.0.0.1", help="Bind host")
    p.add_argument("--port", type=int, default=8000, help="Bind port")
    p.add_argument("--reload", action="store_true", help="Enable auto-reload")
    return p


def main() -> int:
    args = build_parser().parse_args()
    try:
        import uvicorn
    except Exception as exc:  # pragma: no cover
        raise SystemExit(f"uvicorn is required to run the web UI: {exc}")

    uvicorn.run("webui.app:app", host=args.host, port=args.port, reload=bool(args.reload))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
