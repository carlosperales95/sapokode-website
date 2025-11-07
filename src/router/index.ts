import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
			name: "Home",
			path: "/",
			component: () => import("@/views/HomeView.vue" as any),
		},
    {
      path: '/projects',
      name: 'projects',
			component: () => import("@/views/ProjectView.vue" as any),
		},
    {
      path: '/devlogs',
      name: 'devlogs',
			component: () => import("@/views/DevlogsView.vue" as any),
		},

    {
      path: '/devlogs/:id',
      props: true,
      component: () => import("@/components/layouts/MarkdownRenderer.vue" as any), 
    },
    {
      path: '/photography',
      name: 'photography',
      component: () => import("@/views/PhotosView.vue" as any), 
    },
    {
      path: '/photography/:id',
      component: () => import("@/views/AlbumDetailsView.vue" as any), 
      props: true
    },
  ]
})

export default router
