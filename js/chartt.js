// Create a pie chart using Chart.JS

new Chart(document.getElementById("myChart"), {
  type: 'pie',
  data: {
    labels: [" Dr. Ghani", " Dr. Abdullah", " Other"],
    datasets: [{
      data: [923864,720988,179539],
      backgroundColor: ["#6a1207", "#c1be1e","#ffebab"],
      borderColor: "black",
      borderWidth: 0.5,
      hoverBackgroundColor:'#ffef',

    }]
  },
  options:{
    animation: {
      duration: 0
  }
  }
});
