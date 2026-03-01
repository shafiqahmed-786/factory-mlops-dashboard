import hashlib

def generate_event_hash(event):
    raw_string = f"{event.timestamp}-{event.worker_id}-{event.workstation_id}-{event.event_type}-{event.count}"
    return hashlib.sha256(raw_string.encode()).hexdigest()