from collections import defaultdict

def compute_metrics(events):
    workers = defaultdict(lambda: {
        "active_time": 0,
        "idle_time": 0,
        "units": 0
    })

    workstations = defaultdict(lambda: {
        "active_time": 0,
        "idle_time": 0,
        "units": 0
    })

    sorted_events = sorted(events, key=lambda x: x.timestamp)

    for i in range(len(sorted_events) - 1):
        e1 = sorted_events[i]
        e2 = sorted_events[i + 1]

        delta_hours = (e2.timestamp - e1.timestamp).total_seconds() / 3600

        # Worker-level
        if e1.event_type == "working":
            workers[e1.worker_id]["active_time"] += delta_hours
            workstations[e1.workstation_id]["active_time"] += delta_hours

        elif e1.event_type == "idle":
            workers[e1.worker_id]["idle_time"] += delta_hours
            workstations[e1.workstation_id]["idle_time"] += delta_hours

        elif e1.event_type == "product_count":
            workers[e1.worker_id]["units"] += e1.count
            workstations[e1.workstation_id]["units"] += e1.count

    # Compute utilization + rates
    for w in workers.values():
        total = w["active_time"] + w["idle_time"]
        w["utilization"] = (w["active_time"] / total * 100) if total > 0 else 0
        w["units_per_hour"] = (
            w["units"] / w["active_time"] if w["active_time"] > 0 else 0
        )

    for s in workstations.values():
        total = s["active_time"] + s["idle_time"]
        s["utilization"] = (s["active_time"] / total * 100) if total > 0 else 0
        s["throughput_per_hour"] = (
            s["units"] / s["active_time"] if s["active_time"] > 0 else 0
        )

    # Factory-level aggregation
    factory = {
        "total_units": 0,
        "total_active_time": 0,
        "total_idle_time": 0
    }

    for w in workers.values():
        factory["total_units"] += w["units"]
        factory["total_active_time"] += w["active_time"]
        factory["total_idle_time"] += w["idle_time"]

    total_time = factory["total_active_time"] + factory["total_idle_time"]
    factory["average_utilization"] = (
        factory["total_active_time"] / total_time * 100
        if total_time > 0 else 0
    )

    factory["production_rate"] = (
        factory["total_units"] / factory["total_active_time"]
        if factory["total_active_time"] > 0 else 0
    )

    return {
        "factory": factory,
        "workers": workers,
        "workstations": workstations
    }