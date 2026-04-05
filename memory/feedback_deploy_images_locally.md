---
name: deploy-images-locally-first
description: For this project, deployment images must be built locally as linux/amd64 and uploaded to the server; do not build images on the server.
type: feedback
---
Build deployment images locally as `linux/amd64`, upload them to the server, and only load/run them there. Do not build Docker images on the server.

**Why:** The user explicitly corrected a mistaken server-side image build during deployment and expects the deployment skill to enforce local-build-only workflow.

**How to apply:** For any future deploy of this project, use local Docker build/buildx for `linux/amd64`, transfer the image artifact or push to a registry, then restart the server container without `docker build` on the server.
