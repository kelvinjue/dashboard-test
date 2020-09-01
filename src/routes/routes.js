import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Balance from "@/pages/Balance.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "balance",
    children: [
      {
        path: "balance",
        name: "Balance",
        component: Balance,
      },
    ],
  },
];

export default routes;
