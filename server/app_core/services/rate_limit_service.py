from dataclasses import dataclass
from datetime import datetime
from zoneinfo import ZoneInfo

from firebase_admin import firestore


class DailyLimitExceeded(Exception):
    def __init__(self, message, *, limit, remaining, day_key):
        super().__init__(message)
        self.limit = limit
        self.remaining = remaining
        self.day_key = day_key


@dataclass(frozen=True)
class DailyUsageStatus:
    day_key: str
    count: int
    remaining: int
    limit: int


def get_day_key(timezone_name):
    return datetime.now(ZoneInfo(timezone_name)).date().isoformat()


def get_usage_document_id(user_id, day_key):
    return f"{user_id}_{day_key}"


def reserve_daily_analysis_slot(db, *, user_id, daily_limit, timezone_name, collection_name):
    day_key = get_day_key(timezone_name)
    doc_ref = db.collection(collection_name).document(get_usage_document_id(user_id, day_key))
    transaction = db.transaction()

    @firestore.transactional
    def _reserve_slot(transaction):
        snapshot = doc_ref.get(transaction=transaction)
        current_count = snapshot.get("count") if snapshot.exists else 0

        if current_count >= daily_limit:
            raise DailyLimitExceeded(
                "Daily analysis limit reached.",
                limit=daily_limit,
                remaining=0,
                day_key=day_key,
            )

        next_count = current_count + 1
        transaction.set(
            doc_ref,
            {
                "userId": user_id,
                "dayKey": day_key,
                "count": next_count,
                "limit": daily_limit,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            },
            merge=True,
        )
        return DailyUsageStatus(
            day_key=day_key,
            count=next_count,
            remaining=max(daily_limit - next_count, 0),
            limit=daily_limit,
        )

    return _reserve_slot(transaction)


def get_daily_usage_status(db, *, user_id, daily_limit, timezone_name, collection_name):
    day_key = get_day_key(timezone_name)
    doc_ref = db.collection(collection_name).document(get_usage_document_id(user_id, day_key))
    snapshot = doc_ref.get()
    current_count = snapshot.get("count") if snapshot.exists else 0

    return DailyUsageStatus(
        day_key=day_key,
        count=current_count,
        remaining=max(daily_limit - current_count, 0),
        limit=daily_limit,
    )
