import { apiRequest } from "@/services/apiClient";
import { normalizeRoles } from "@/features/auth/tokenStorage";

/** Admin user-management API (all calls need an ADMIN token). */
const BASE = "/admin/users";

export type AdminUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  roles: string[];
  active: boolean;
  createdAt?: string;
  lastLoginAt?: string;
};

export type UserQuery = {
  page: number; // zero-based, as Spring expects
  size: number;
  sort?: string; // e.g. "createdAt,desc"
  search?: string;
  status?: "active" | "inactive" | "";
  role?: string;
};

export type UserPage = {
  items: AdminUser[];
  total: number;
  totalPages: number;
  page: number;
  size: number;
};

/** Maps whatever shape one user comes back in to AdminUser. */
export function toAdminUser(u: any): AdminUser {
  const first = [u?.firstName, u?.lastName].filter(Boolean).join(" ");
  const status = typeof u?.status === "string" ? u.status.toUpperCase() : undefined;
  const active =
    typeof u?.active === "boolean"
      ? u.active
      : typeof u?.enabled === "boolean"
        ? u.enabled
        : typeof u?.isActive === "boolean"
          ? u.isActive
          : status
            ? status === "ACTIVE"
            : true;
  return {
    id: String(u?.id ?? u?.userId ?? ""),
    name: u?.fullName ?? u?.name ?? u?.displayName ?? first ?? "",
    username: u?.username ?? u?.login ?? "",
    email: u?.email ?? "",
    roles: normalizeRoles(u?.roles ?? u?.role ?? u?.userRoles ?? u?.roleNames ?? u?.authorities ?? u?.permissions),
    active,
    createdAt: u?.createdAt ?? u?.created_at ?? u?.createdOn ?? u?.createdDate ?? u?.created ?? u?.insertedOn ?? u?.registeredAt,
    lastLoginAt: u?.lastLoginAt ?? u?.lastLogin ?? u?.lastLoginDate
  };
}

/** The dashboard's column names, mapped to the API's sortBy fields. */
const USER_SORT: Record<string, string> = {
  name: "firstName",
  username: "username",
  email: "email",
  active: "isActive",
  createdAt: "insertedOn",
  lastLoginAt: "lastLoginOn",
};

/** GET /admin/users: paged, sorted, filtered. */
export async function listUsers(q: UserQuery): Promise<UserPage> {
  const [field, dir] = (q.sort ?? "").split(",");
  const data = await apiRequest<any>(BASE, {
    auth: true,
    query: {
      page: q.page,
      size: q.size,
      sortBy: field ? USER_SORT[field] ?? field : undefined,
      sortDir: dir === "asc" || dir === "desc" ? dir : undefined,
      search: q.search?.trim(),
      isActive: q.status === "active" ? true : q.status === "inactive" ? false : undefined,
      role: q.role,
    },
  });
  const rows: any[] = Array.isArray(data) ? data : data?.content ?? [];
  const items = rows.map(toAdminUser);
  return {
    items,
    total: data?.totalElements ?? items.length,
    totalPages: data?.totalPages ?? 1,
    page: data?.pageNumber ?? q.page,
    size: data?.pageSize ?? q.size,
  };
}

/** GET /admin/users/{userId} */
export const getUser = async (id: string) => toAdminUser(await apiRequest<any>(`${BASE}/${encodeURIComponent(id)}`, { auth: true }));

/** PUT /admin/users/{userId}/roles: replaces the whole set. */
export const replaceRoles = (id: string, roles: string[]) =>
  apiRequest<unknown>(`${BASE}/${encodeURIComponent(id)}/roles`, { method: "PUT", auth: true, body: { roles } });

/** PATCH /admin/users/{userId}/status */
export const setUserStatus = (id: string, active: boolean) =>
  apiRequest<unknown>(`${BASE}/${encodeURIComponent(id)}/status`, { method: "PATCH", auth: true, body: { isActive: active } });

/** PUT /admin/users/{userId}/password */
export const resetPasswordById = (id: string, newPassword: string) =>
  apiRequest<unknown>(`${BASE}/${encodeURIComponent(id)}/password`, { method: "PUT", auth: true, body: { newPassword } });

/** POST /admin/users/reset-password: by username or email. */
export const resetPasswordByLogin = (login: string, newPassword: string) =>
  apiRequest<unknown>(`${BASE}/reset-password`, { method: "POST", auth: true, body: { login, newPassword } });

/** SignupRequestDto: firstName, lastName, username, email and password are required; roles is optional. */
export type NewUser = { firstName: string; lastName: string; username: string; email: string; password: string; roles: string[] };

/**
 * POST /auth/signup (ADMIN only): creates an account for someone else.
 * Deliberately not authService.signupRequest, which would store the new user's token and log the admin out of their own session.
 */
export const createUser = (u: NewUser) =>
  apiRequest<unknown>("/auth/signup", {
    method: "POST",
    auth: true,
    body: { firstName: u.firstName, lastName: u.lastName, username: u.username, email: u.email, password: u.password, roles: u.roles },
  });

/** DELETE /admin/users/{userId}: permanent. You cannot delete your own account. */
export const deleteUser = (id: string) => apiRequest<unknown>(`${BASE}/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });

/** POST /admin/users/bulk-delete: up to 100 ids. Refused (400) if your own id is in the list. */
export const bulkDeleteUsers = (ids: string[]) =>
  apiRequest<{ message?: string }>(`${BASE}/bulk-delete`, { method: "POST", auth: true, body: { ids: ids.map(Number) } });
