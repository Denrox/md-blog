import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/blog/index.tsx"),
    route("/blog/:slug", "routes/blog/$slug.tsx"),
    route("/pages", "routes/pages/index.tsx"),
    route("/pages/:slug", "routes/pages/$slug.tsx"),
  ]),
    route("/api/content", "routes/api.content.ts"),
] satisfies RouteConfig;
