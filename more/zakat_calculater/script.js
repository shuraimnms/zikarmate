const zakatForm = document.getElementById("zakat-form");
const zakatAmount = document.getElementById("zakat-amount");
const nisabStatus = document.getElementById("nisab-status");
const whyZakat = document.getElementById("why-zakat");
const resultSection = document.getElementById("zakat-result");
const toggleHadithButton = document.querySelector(".toggle-hadith");
const hadithContent = document.querySelector(".hadith-content");
const toggleLanguageButton = document.getElementById("toggle-language");

let isUrdu = false;

// Nisab threshold in INR
const nisabValue = 5500 * 87.48; // Nisab for gold (87.48 grams at ₹5500 per gram)

zakatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const goldValue = parseFloat(document.getElementById("gold-value").value) || 0;
  const silverValue = parseFloat(document.getElementById("silver-value").value) || 0;
  const cashValue = parseFloat(document.getElementById("cash-value").value) || 0;
  const businessValue = parseFloat(document.getElementById("business-value").value) || 0;
  const propertyValue = parseFloat(document.getElementById("property-value").value) || 0;

  const totalAssets = goldValue + silverValue + cashValue + businessValue + propertyValue;
  const zakat = (totalAssets * 0.025).toFixed(2);

  zakatAmount.textContent = `₹${zakat}`;
  nisabStatus.textContent = isUrdu
    ? (totalAssets >= nisabValue ? "آپ زکوٰۃ ادا کرنے کے اہل ہیں۔" : "آپ زکوٰۃ ادا کرنے کے اہل نہیں ہیں۔")
    : (totalAssets >= nisabValue ? "You are eligible to pay Zakat." : "You are not eligible to pay Zakat.");
  
  whyZakat.textContent = isUrdu
    ? `آپ کے کل اثاثے (₹${totalAssets}) نصاب کی حد (₹${nisabValue.toFixed(2)}) سے زیادہ ہیں۔`
    : `Your total assets (₹${totalAssets}) exceed the Nisab threshold (₹${nisabValue.toFixed(2)}).`;

  resultSection.style.display = "block";
});

// Hadith Toggle
toggleHadithButton.addEventListener("click", () => {
  hadithContent.style.display = hadithContent.style.display === "none" ? "block" : "none";
});

// Language Toggle
toggleLanguageButton.addEventListener("click", () => {
  isUrdu = !isUrdu;
  document.getElementById("title").textContent = isUrdu ? "زکوٰۃ کیلکولیٹر" : "Zakat Calculator";
  document.getElementById("subtitle").textContent = isUrdu ? "آسانی سے زکوٰۃ کا حساب لگائیں" : "Calculate your Zakat easily";
  document.getElementById("zakat-label").textContent = isUrdu ? "زکوٰۃ کی رقم:" : "Zakat Amount:";
  toggleLanguageButton.textContent = isUrdu ? "English" : "اردو";
});
