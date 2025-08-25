const mp = new MercadoPago("SUA_PUBLIC_KEY_AQUI", { locale: "pt-BR" });

const BACKEND_URL = "http://localhost:3000"; // trocar para a URL no Render/Heroku

document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      createPreference("Produto X", 1, 100);
    });
  }
});

async function createPreference(title, quantity, price) {
  try {
    const response = await fetch(`${BACKEND_URL}/create_preference`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, quantity, price })
    });

    const { id } = await response.json();

    mp.checkout({
      preference: { id },
      render: {
        container: ".cho-container",
        label: "Pagar",
      },
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
  }
}