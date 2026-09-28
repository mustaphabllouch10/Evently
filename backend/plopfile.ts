import type { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  // Controller
  plop.setGenerator("controller", {
    description: "Create an Express controller",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Controller name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/controllers/{{kebabCase name}}.controller.ts",
        templateFile: "generators/controller.hbs",
      },
    ],
  });

  // Middleware
  plop.setGenerator("middleware", {
    description: "Create an Express middleware",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Middleware name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/middleware/{{kebabCase name}}.ts",
        templateFile: "generators/middleware.hbs",
      },
    ],
  });
}