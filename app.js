// app.js

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const duaContainer = document.getElementById("daily-dua");

    // Duas for each day of the week
    const weeklyDuas = {
        Monday: "اللهم اجعلنا من الذين يسيرون على صراطك المستقيم.",
        Tuesday: "اللهم ارزقنا العلم النافع والعمل الصالح.",
        Wednesday: "اللهم اجعلنا من الذين يتبعون هديك.",
        Thursday: "اللهم اجعل يومنا هذا مليئاً بالبركة والتوفيق.",
        Friday: "اللهم اجعلنا من الذين يسمعون القول فيتبعون أحسنه.",
        Saturday: "اللهم ارزقنا السكينة في قلوبنا، والطمأنينة في حياتنا.",
        Sunday: "اللهم اجعلنا من عبادك الصالحين."
    };

    // Get today's day name
    const today = new Date();
    const options = { weekday: "long" }; // Format to get the full weekday name
    const dayName = today.toLocaleDateString("en-US", options); // e.g., "Monday"

    // Display the dua for the current day
    if (duaContainer) {
        duaContainer.innerHTML = `
            <p class="text-gray-700 text-lg font-semibold">
                <span class="text-green-600">${dayName}:</span> ${weeklyDuas[dayName] || "No dua found for today!"}
            </p>
        `;
    } else {
        console.error("Dua container not found!");
    }
});

function openSettings() {
    // Add your settings panel code here
    console.log("Settings button clicked!");
}
// Function to get the Islamic date
function getIslamicDate() {
    try {
      const islamicMonths = [
        "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
        "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
        "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
      ];
  
      const date = new Date();
      const islamicFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      const formattedDate = islamicFormatter.formatToParts(date);
  
      // Extract day, month, and year
      let day = parseInt(formattedDate.find(part => part.type === 'day').value, 10);
      const monthIndex = parseInt(formattedDate.find(part => part.type === 'month').value, 10) - 1;
      const year = formattedDate.find(part => part.type === 'year').value;
  
      // Apply an offset to match local moon sightings
      const offset = -1; // Adjust this value (-1, 0, +1, etc.) based on your location
      day += offset;
  
      // Handle day overflow/underflow
      if (day < 1) {
        // Go to the previous month
        const prevMonthIndex = (monthIndex === 0) ? 11 : monthIndex - 1;
        const prevMonthDays = (prevMonthIndex === 1) ? 29 : 30; // Safar has 29 days; others typically 30
        day += prevMonthDays;
      } else if (day > 30) {
        // Go to the next month
        day -= 30;
      }
  
      // Map month index to Islamic month name
      const islamicMonth = islamicMonths[monthIndex];
  
      return `${day} ${islamicMonth} ${year}`;
    } catch (error) {
      // Fallback to manual calculation if Intl fails
      return calculateHijriFallback();
    }
  }
  
  // Function to get the Gregorian date
  function getGregorianDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  // Display the dates on page load
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gregorian-date").innerText = getGregorianDate();
    document.getElementById("islamic-date").innerText = getIslamicDate();
  });
  