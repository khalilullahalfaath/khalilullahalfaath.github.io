---
title: "TSP Wisata Jogja — Genetic Algorithm"
date: 2025-12-15T10:00:00+07:00
icon: "🧭"
status: "completed"
role: "Developer"
period: "May 2026 - June 2026"
tech: ["Streamlit", "Genetic Algorithm", "Folium", "OSRM", "Python"]
links:
  - label: "GitHub"
    url: "https://github.com/Rezahatmi06/TSP-Tempat-wisata-Jogja-dengan-Algoritma-Genetika"
  - label: "Drive Folder"
    url: "https://drive.google.com/drive/folders/1m7BzOPnbzfv6dJ1wW3Z8sYxf81iIJj7A"
description: "Route optimization app for Yogyakarta tourist destinations using a Genetic Algorithm to solve the Traveling Salesman Problem, with an interactive map."
---

Same team as the Data Science final project (Aditya Murti Kusuma Atmaja, Fawwaz Rif'at Revista, Khalilullah Al Faath, Reza Ananda Hatmi).

A route optimization app for Yogyakarta tourist destinations using a **Genetic Algorithm (GA)** to solve the **Traveling Salesman Problem (TSP)**. Built with Streamlit and an interactive OpenStreetMap-based map.

## Features

- **Interactive map** — click directly on the map to add destinations
- **Location search** — search place names via Photon + Nominatim (no API key needed)
- **Demo data** — one click to fill in sample destinations
- **Custom starting point** — set your own starting point for the trip
- **Optimal route** — GA finds the visiting order with the shortest total distance
- **Alternative routes** — shows 1–5 alternative routes structurally different from the optimal one
- **Distance labels on the map** — each segment's distance is shown directly on the route
- **Validation table** — per-leg and cumulative distance details for manual validation via Google Maps
- **Convergence chart** — visualizes GA fitness progress across generations

## Tech Stack

| Component | Library / Service |
|---|---|
| UI | [Streamlit](https://streamlit.io) |
| Map | [Folium](https://python-visualization.github.io/folium/) + OpenStreetMap |
| Real road distance | [OSRM](http://router.project-osrm.org) (free, no API key) |
| Geocoding search | [Photon](https://photon.komoot.io) → [Nominatim](https://nominatim.openstreetmap.org) fallback |
| Visualization | [Plotly](https://plotly.com/python/) |
| Algorithm | Pure Python (`random`, `math`) |

## Algorithm

**Representation:** each individual is a permutation of destination indices, e.g. `[2, 0, 4, 1, 3]`.

**GA cycle:**
1. **Initialization** — random population (if a starting point is set, its position is locked)
2. **Evaluation** — total route distance including the leg back to the start
3. **Selection** — Tournament Selection
4. **Crossover** — Order Crossover (OX), preserving permutation validity
5. **Mutation** — Swap Mutation or Inversion Mutation (50/50)
6. **Elitism** — the 2 best individuals carry over directly to the next generation

Alternative routes are collected from snapshots of the top-5 individuals every 10 generations, then filtered using **edge-set diversity** — a route is accepted only if it differs by at least ⌈n/3⌉ edges from the optimal route and from any other alternative already selected.

## Notes

- Distances are calculated via **OSRM** (real road distance), not straight-line
- All services used are free and require no API key
