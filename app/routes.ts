import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx", { id: "index" }),
  route("login", "routes/login.tsx", { id: "login-route" }),
  route("register", "routes/register.tsx", { id: "register-route" }),
  route("admin/dashboard", "routes/admin-dashboard.tsx"),
  route("student/dashboard", "routes/student-dashboard.tsx"),
  route("student/reservations", "routes/student-reservations.tsx"),
] satisfies RouteConfig;
