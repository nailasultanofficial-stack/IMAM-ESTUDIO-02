import { queryOptions } from "@tanstack/react-query";

import {
  getCustomPage,
  getHomepage,
  getProjectBySlug,
  getProjects,
  getServiceBySlug,
  getServices,
} from "@/lib/public.functions";

export const homepageQuery = queryOptions({
  queryKey: ["public", "homepage"],
  queryFn: () => getHomepage(),
  staleTime: 60_000,
});

export const servicesQuery = queryOptions({
  queryKey: ["public", "services"],
  queryFn: () => getServices(),
  staleTime: 60_000,
});

export const projectsQuery = queryOptions({
  queryKey: ["public", "projects"],
  queryFn: () => getProjects(),
  staleTime: 60_000,
});

export const serviceQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "service", slug],
    queryFn: () => getServiceBySlug({ data: { slug } }),
    staleTime: 60_000,
  });

export const projectQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "project", slug],
    queryFn: () => getProjectBySlug({ data: { slug } }),
    staleTime: 60_000,
  });

export const customPageQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "page", slug],
    queryFn: () => getCustomPage({ data: { slug } }),
    staleTime: 60_000,
  });
