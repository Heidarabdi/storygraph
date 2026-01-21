
# Storygraph

**Consistent, story-driven image generation.**

Storygraph is a technical platform for generating **consistent visual narratives** using modern image generation models.  
It allows creators and teams to define characters, locations, styles, and story structure once — and generate images across scenes that remain visually coherent over time.

Storygraph is **image-first**, **model-agnostic**, and built as a **visual narrative system**, not a prompt toy.

---

## Why Storygraph?

Most image generation tools are stateless:
- Each prompt is isolated
- Character appearance drifts
- Style and environment reset every generation
- Story continuity breaks quickly

Storygraph introduces **structured visual memory** and **scene-based generation**, enabling consistency across an entire story.

---

## Core Concepts

### Visual Graph
Stories are represented as a graph:
- **Assets**: characters, locations, props, styles
- **Scenes**: structured compositions referencing assets
- **Frames**: generated images tied to scene state

This graph persists across generations.

### Asset-Driven Consistency
Assets are first-class entities:
- Reusable across scenes
- Referenced programmatically
- Locked to preserve visual identity

### Scene-Based Generation
Instead of raw prompts:
- Scenes define intent and structure
- Prompts are composed automatically
- Regeneration preserves context

---

## Features

- Project-based story organization
- Asset library (characters, locations, styles)
- Scene editor with asset references
- Image generation with version history
- Consistency controls & reference injection
- Model-agnostic generation backend
- Export to image sequences and PDFs

> Video / animatic support is optional and secondary.

---

## Model Support

Storygraph is **model-agnostic** and currently integrates with:

- **fal.ai SDK**
  - Image generation pipelines
  - Reference images
  - LoRA / fine-tuned models
  - Async job execution

Additional providers can be added without changing the core system.

> fal.ai is used as a generation backend — it is not a model itself.

---

## Tech Stack

### Frontend
- TanStack Start
- React
- Tailwind CSS
- shadcn/ui

### Backend
- Convex
  - Project & scene storage
  - Asset graph
  - Versioning
  - Real-time updates (future)

### Architecture
- Graph-based data model
- Deterministic prompt composition
- Stateless model execution
- Persistent visual memory

---

## Who Is This For?

- Storyboard artists & filmmakers
- Game studios & narrative designers
- Writers exploring visual storytelling
- Creative teams needing consistency at scale
- Developers building visual narrative tools

---

## What Storygraph Is Not

- Not a prompt playground
- Not a meme generator
- Not video-first
- Not tied to one AI model

Storygraph is **infrastructure for visual storytelling**.

---

## Status

🚧 Early development / active iteration  
Contributions and feedback welcome.

---

## License

MIT
