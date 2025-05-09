// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#e63946", // Vermelho principal
        secondary: "#3b82f6", // Azul do botão "Detalhes"
        success: "#38b000", // Verde do botão "Concluir"
        successLight: "#d9fdd3", // Fundo verde claro (pedido concluído)
        warning: "#facc15", // Amarelo claro (badge "Pendente")
        card: "#f9fafb", // Fundo claro dos cards
        border: "#e5e7eb", // Borda dos cards
        textPrimary: "#111827", // Título/valores
        textSecondary: "#6b7280", // Infos como horário, itens
        bgLight: "#f3f4f6", // Fundo geral da página
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
