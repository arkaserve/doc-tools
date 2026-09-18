import json
import os
import asyncio
from pathlib import Path
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse

router = APIRouter()

STATS_FILE = Path(__file__).parent.parent / "data" / "page_stats.json"
_lock = asyncio.Lock()


def _load() -> dict:
    if STATS_FILE.exists():
        try:
            return json.loads(STATS_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    return {"pages": {}, "total": 0}


def _save(data: dict):
    STATS_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATS_FILE.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")


@router.post("/visit")
async def record_visit(page: str = Query(..., description="Tool path, e.g. merge-pdf")):
    """Increment the visit counter for a tool page."""
    async with _lock:
        data = _load()
        data["pages"][page] = data["pages"].get(page, 0) + 1
        data["total"] = data.get("total", 0) + 1
        _save(data)
        return {"page": page, "count": data["pages"][page], "total": data["total"]}


@router.get("/")
async def get_stats(page: str = Query(None, description="Tool path to get count for, or omit for all")):
    """Get visit counts — a single page or all pages."""
    data = _load()
    if page:
        return {"page": page, "count": data["pages"].get(page, 0), "total": data.get("total", 0)}
    return {"pages": data["pages"], "total": data.get("total", 0)}
