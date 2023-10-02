const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const styledButton = document.getElementById(".styled-button");

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#6aaea4",
  "#038C7F",
  "#6aaea4",
  " #038C7F",
  "#6aaea4",
  " #038C7F",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [50, 100, 150, 200, 250, 300],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 27 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i = 0; i < myChart.data.labels.length; i++) {
    const minDegree = (360 / myChart.data.labels.length) * i;
    const maxDegree = (360 / myChart.data.labels.length) * (i + 1);
    // If the angleValue is between min and max, then display the corresponding label value
    if (angleValue >= minDegree && angleValue < maxDegree) {
      const lastr = document.getElementById("last");
      lastr.play();
      Swal.fire({
        title: 'مسك الختام بذكر محمّد و آل محمد',
        text: ` في هذا اليوم المبارك ما أجمل أن تهدي  مولانا صاحب العصر و الزمان (عج) ثواب الصلاة على محمد و آل محمد ${myChart.data.labels[i]}مرّة`,
        confirmButtonText: 'تم',
      }).then(() => {
        // After clicking OK, show celebration Swal and hide elements

        Swal.fire({
          title: ' 🎉!  مبروك لقد فزت',
          text: 'شكرا لمشاركتك في اللعبة  ',
          confirmButtonText: 'القرعة',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the Google Form when "Go to Google Form" is clicked
            window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSde420R0iY055QFDtyiXxQnW31OTiLF_jdmvAn8o-iRoyKzHw/viewform?usp=sf_link';
          }
        }); spinBtn.disabled = false;
      });
    }
  }
};






//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  //finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
spinBtn.addEventListener("touchstart", () => {
  spinBtn.disabled = true;
  //Empty final value
  //finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
function showAlert() {

  Swal.fire({
    title: 'المرحلة الأخيرة',

    text: '  كثيرةهي الأعمال المستحبة في هذا اليوم المبارك ! عزيزتي حرّك العجلة بالضغط على زر حرّك ليختار لك عمل مستحب ',
    confirmButtonText: 'تم'
  });
}
styledButton.addEventListener("click", showAlert);
styledButton.addEventListener("touchstart", showAlert);