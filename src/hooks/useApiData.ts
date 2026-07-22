import { useState, useEffect, useRef } from 'react';
import {
  fetchDepartments,
  fetchDepartmentBySlug,
  fetchAnnouncements,
  fetchAnnouncementsByDepartment,
  fetchAnnouncementById,
  fetchPosts,
  fetchPostsByDepartment,
  fetchPostById,
  fetchTestimonials,
  fetchTimelineEvents,
  fetchSiteSettings,
} from '../services/api';
import type {
  Department,
  Announcement,
  Post,
  Testimonial,
  TimelineEvent,
  SiteSettings,
  DepartmentSlug,
} from '../types';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fnRef
      .current()
      .then((result) => {
        if (!cancelled) setState({ data: result, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled)
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load data',
          });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

export function useDepartments() {
  return useAsync<Department[]>(fetchDepartments, []);
}

export function useDepartment(slug: string | undefined) {
  return useAsync<Department | undefined>(
    () => fetchDepartmentBySlug(slug ?? ''),
    [slug],
  );
}

export function useAnnouncements() {
  return useAsync<Announcement[]>(fetchAnnouncements, []);
}

export function useAnnouncementsByDepartment(slug: DepartmentSlug | undefined) {
  return useAsync<Announcement[]>(
    () => (slug ? fetchAnnouncementsByDepartment(slug) : Promise.resolve([])),
    [slug],
  );
}

export function useAnnouncement(id: string | undefined) {
  return useAsync<Announcement | undefined>(
    () => fetchAnnouncementById(id ?? ''),
    [id],
  );
}

export function usePosts() {
  return useAsync<Post[]>(fetchPosts, []);
}

export function usePostsByDepartment(slug: DepartmentSlug | undefined) {
  return useAsync<Post[]>(
    () => (slug ? fetchPostsByDepartment(slug) : Promise.resolve([])),
    [slug],
  );
}

export function usePost(id: string | undefined) {
  return useAsync<Post | undefined>(() => fetchPostById(id ?? ''), [id]);
}

export function useTestimonials() {
  return useAsync<Testimonial[]>(fetchTestimonials, []);
}

export function useTimelineEvents() {
  return useAsync<TimelineEvent[]>(fetchTimelineEvents, []);
}

export function useSiteSettings() {
  return useAsync<SiteSettings>(fetchSiteSettings, []);
}
