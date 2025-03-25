let gems = 0;
let clickValue = 1;
let autoClickers = 0;
let autoClickerInterval;
let upgradeLevels = [0, 0, 0];
let upgradeCosts = [10, 50, 100];
let upgradeEffects = [
  {
    description: "Each click gives +1 gem",
    effect: () => {
      clickValue += 1;
    },
  },
  {
    description: "Auto-clicks every 10 seconds",
    effect: () => {
      autoClickers += 1;
      updateAutoClicker();
    },
  },
  {
    description: "2x gems per click",
    effect: () => {
      clickValue *= 2;
    },
  },
];

function updateDisplay() {
  document.getElementById("gemCounter").textContent = `Gems: ${Math.floor(
    gems
  )}`;

  // Update upgrade buttons
  for (let i = 0; i < 3; i++) {
    document.getElementById(`upgrade${i + 1}Cost`).textContent = Math.floor(
      upgradeCosts[i]
    );
    document.getElementById(`upgrade${i + 1}Level`).textContent =
      upgradeLevels[i];

    // Disable button if not enough gems
    document.getElementById(`upgrade${i + 1}Btn`).disabled =
      gems < upgradeCosts[i];
  }
}

function updateAutoClicker() {
  clearInterval(autoClickerInterval);

  if (autoClickers > 0) {
    autoClickerInterval = setInterval(() => {
      addGems(clickValue * autoClickers);
      createGemAnimation();
    }, 10000);

    document.getElementById(
      "autoClickerStatus"
    ).textContent = `Auto-clicking: ${autoClickers} gems every 10 seconds!`;
  } else {
    document.getElementById("autoClickerStatus").textContent =
      "No auto-clickers yet!";
  }
}

function addGems(amount) {
  gems += amount;
  updateDisplay();
}

function createGemAnimation() {
  const gem = document.getElementById("gem");
  const animation = document.createElement("div");
  animation.className = "gemAnimation";
  animation.textContent = `+${clickValue}`;
  animation.style.left = `${gem.offsetLeft + gem.offsetWidth / 2 - 20}px`;
  animation.style.top = `${gem.offsetTop}px`;
  document.body.appendChild(animation);

  // Remove animation after it's done
  setTimeout(() => {
    animation.remove();
  }, 1000);
}

function buyUpgrade(upgradeIndex) {
  const index = upgradeIndex - 1;

  if (gems >= upgradeCosts[index]) {
    gems -= upgradeCosts[index];
    upgradeLevels[index]++;
    upgradeCosts[index] = Math.floor(upgradeCosts[index] * 1.5);

    // Apply upgrade effect
    upgradeEffects[index].effect();

    updateDisplay();
  }
}

// Initialize
document.getElementById("gem").addEventListener("click", () => {
  addGems(clickValue);
  createGemAnimation();

  // Add a little bounce effect
  const gem = document.getElementById("gem");
  gem.style.transform = "scale(0.9)";
  setTimeout(() => {
    gem.style.transform = "scale(1)";
  }, 100);
});

updateDisplay();
