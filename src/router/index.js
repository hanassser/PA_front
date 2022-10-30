import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // login
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
  // post
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/Create"),
    meta: { title: "信息发布", requireAuth: true },
  },
  // edit
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // detail
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/post/Detail"),
    meta: { title: "详情" },
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '主题列表' }
  },
  // search
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
  // user home
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
  },
  // user setting
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/user/Setting'),
    meta: { title: '设置', requireAuth: true }
  },
  {
    name: 'user-codepost',
    path: '/member/:username/codepost',
    component: () => import('@/views/codepost/CodePostHome'),
    meta: { title: 'code post', requireAuth: true }
  },
  // detail
  {
    name: "codepost-detail",
    path: "/codepost/:id",
    component: () => import("@/views/codepost/CodePostDetail"),
    meta: { title: "详情" },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
  {
    path: "/code-editor",
    name: "code-editor",
    component: () => import("@/views/codeEditor/CodeEditor"),
    meta: { title: 'code editor', requireAuth: true }
  },

  {
    path: "/diff-editor/:id/:idtocompare",
    name: "diff-editor",
    component: () => import("@/views/diffEditor/DiffEditor"),
    meta: { title: 'diff editor', requireAuth: true }
  },
  {
    path: "/code-collab/:id",
    name: "code-collab",
    component: () => import("@/views/codeCollaboration/CodeCollaboration"),
    meta: { title: 'code collaboration', requireAuth: true }
  },
  {
    path: "/code-review/:id",
    name: "code-review",
    component: () => import("@/views/codeReview/CodeReview"),
    meta: { title: 'code Review', requireAuth: true }
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
