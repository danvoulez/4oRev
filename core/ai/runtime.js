export function generateModuleFromPrompt(prompt) {
  return {
    id: "ai-module",
    name: "Módulo gerado por IA",
    type: "dashboard",
    status: "active",
    role: ["admin"],
    components: ["AIComponentA", "AIComponentB"],
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString()
  };
}
