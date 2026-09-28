import type { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
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
}