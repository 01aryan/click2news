import Icons from "icons/sidebar";
const index = [{
  title: "Dashboard",
  Icon: Icons.DashboardIcon,
  children: [{
    subTitle: "Dashboards",
    subCategories: [{
      name: "Saas",
      path: "/dashboard/"
    }, {
      name: "Sales",
      path: "/dashboard/sales"
    }, {
      name: "Project Management",
      path: "/dashboard/project-management"
    }, {
      name: "Project Management V2",
      path: "/dashboard/project-management-v2"
    }],
    path: ""
  }]
},  {
  title: "Projects",
  Icon: Icons.ProjectIcon,
  children: [{
    subTitle: "Project List V1",
    path: "/dashboard/uko-project-v1"
  }, {
    subTitle: "Project List V2",
    path: "/dashboard/uko-project-v2"
  }, {
    subTitle: "Project List V3",
    path: "/dashboard/uko-project-v3"
  }, {
    subTitle: "Project Details",
    path: "/dashboard/project-details"
  }]
}];
export default index;