import React from "react";
import type { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HeaderWithFoodItems from "../components/Header";
import HomePage from "../pages/HomePage";
import UserProfile from "../components/UserProfile";
import RecipeList from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import RecipeDetails from "../components/RecipeDetail";
import Login from "../components/LoginModal"; // Import Login component

const componentMap: Record<string, React.ComponentType> = {
  MainLayout,
  HeaderWithFoodItems,
  HomePage,
  UserProfile,
  RecipeList,
  NewRecipe,
  RecipeDetails,
  Login, // Add Login here
};

type RawRoute = {
  path?: string;
  index?: boolean;
  component: keyof typeof componentMap;
  children?: RawRoute[];
};

const rawRoutes: RawRoute[] = [
  {
    path: "/login",
    component: "Login",
    children: [
      { index: true, component: "Login" }, // fixed capitalization
      { path: "home", component: "HomePage" },
    ],
  },
  {
    path: "/",
    component: "MainLayout",
    children: [
      { index: true, component: "HeaderWithFoodItems" },
      { path: "home", component: "HomePage" },
      { path: "profile", component: "UserProfile" },
      {
        path: "recipes",
        component: "RecipeList",
        children: [
          { path: "newrecipe", component: "NewRecipe" },
          { path: ":id", component: "RecipeDetails" }, // dynamic route works here
        ],
      },
    ],
  },
];

export function generateRoutes(routes: RawRoute[]): RouteObject[] {
  return routes.map(({ path, component, children, index }) => ({
    ...(index ? { index: true } : { path }),
    element: React.createElement(componentMap[component]),
    children: children ? generateRoutes(children) : undefined,
  }));
}

const appRoutes: RouteObject[] = generateRoutes(rawRoutes);
export default appRoutes;
