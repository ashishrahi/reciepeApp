import React from "react";
import type { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HeaderWithFoodItems from "../components/Header";
import HomePage from "../pages/HomePage";
import UserProfile from "../components/UserProfile";
import RecipeList from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import RecipeDetails from "../components/RecipeDetail";

// Component map to resolve string names to actual React components
const componentMap: Record<string, React.ComponentType> = {
  MainLayout,
  HeaderWithFoodItems,
  HomePage,
  UserProfile,
  RecipeList,
  NewRecipe,
  RecipeDetails,
};

type RawRoute = {
  path: string;
  component: keyof typeof componentMap;
  children?: RawRoute[];
};

// Sample raw route config data
const rawRoutes: RawRoute[] = [
  {
    path: "/",
    component: "MainLayout",
    children: [
      { path: "landing", component: "HeaderWithFoodItems" },
      { path: "home", component: "HomePage" },
      { path: "profile", component: "UserProfile" },
      { path: "recipes", component: "RecipeList" },
      { path: "recipes/newrecipe", component: "NewRecipe" },
      { path: "recipes/:id", component: "RecipeDetails" },
    ],
  },
];

// generateRoute function converts RawRoute[] to RouteObject[]
export function generateRoutes(routes: RawRoute[]): RouteObject[] {
  return routes.map(({ path, component, children }) => ({
    path,
    element: React.createElement(componentMap[component]),
    children: children ? generateRoutes(children) : undefined,
  }));
}

// Generated routes
const appRoutes: RouteObject[] = generateRoutes(rawRoutes);

export default appRoutes;