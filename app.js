const { createCanvas } = require("canvas");
const fs = require("fs");
const express = require('express')
const app = express()
const port = 80

app.get('/results/:param1/:param2/:param3/:param4/:param5/:param6/:param7/:param8/:param9/:param10', (req, res) => {

  const inputs = Object.values(req.params);

  const svg = generateSvg(inputs);

  res.set('Content-Type', 'image/svg+xml');
  res.send(svg);

});

app.get('/', (req, res) => {
    res.send(`
=
<html>
<head>
  <title>PVQ Sample</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }

    h1 {
      text-align: center;
    }

    form {
      max-width: 400px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    label {
      display: block;
      margin-bottom: 10px;
    }

    input[type="number"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    button[type="submit"] {
      background-color: #4CAF50;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    button[type="submit"]:hover {
      background-color: #45a049;
    }
  </style>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('input[type="number"]');
      inputs.forEach(input => {
        const randomValue = Math.floor(Math.random() * 91) + 10; // Generate random value from 10 to 100
        input.value = randomValue;
      });

      const form = document.querySelector('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        // Build the URL with the input values
        const inputs = Array.from(form.elements)
          .filter(element => element.type === 'number')
          .map(element => element.value);
        const url = '/results/' + inputs.join('/');

        // Redirect to the URL
        window.location.href = url;
      });
    });
  </script>
</head>
<body>
  <h1>PVQ Sample</h1>
  <form>
    <label for="pvq1">PVQ 1:</label>
    <input type="number" name="pvq1" id="pvq1" min="0" max="100" required><br>

    <label for="pvq2">PVQ 2:</label>
    <input type="number" name="pvq2" id="pvq2" min="0" max="100" required><br>

    <label for="pvq3">PVQ 3:</label>
    <input type="number" name="pvq3" id="pvq3" min="0" max="100" required><br>

    <label for="pvq4">PVQ 4:</label>
    <input type="number" name="pvq4" id="pvq4" min="0" max="100" required><br>

    <label for="pvq5">PVQ 5:</label>
    <input type="number" name="pvq5" id="pvq5" min="0" max="100" required><br>

    <label for="pvq6">PVQ 6:</label>
    <input type="number" name="pvq6" id="pvq6" min="0" max="100" required><br>

    <label for="pvq7">PVQ 7:</label>
    <input type="number" name="pvq7" id="pvq7" min="0" max="100" required><br>

    <label for="pvq8">PVQ 8:</label>
    <input type="number" name="pvq8" id="pvq8" min="0" max="100" required><br>
      
          <label for="pvq9">PVQ 9:</label>
          <input type="number" name="pvq9" id="pvq9" min="0" max="100" required><br>
      
          <label for="pvq10">PVQ 10:</label>
          <input type="number" name="pvq10" id="pvq10" min="0" max="100" required><br>
          <br>
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    
    `);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function generateSvg(inputs) {

  const size = 500;
  const canvas = createCanvas(size, size, 'svg');
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  slice(0, '#DC594F', inputs[0])
  slice(1, '#A652BB', inputs[1])
  slice(2, '#0281BE', inputs[2])
  slice(3, '#07C099', inputs[3])
  slice(4, '#FAC302', inputs[4])
  slice(5, '#F47802', inputs[5])
  slice(6, '#A652BB', inputs[6])
  slice(7, '#FACF00', inputs[7])
  slice(8, '#233748', inputs[8])
  slice(9, '#6D7D7D', inputs[9])


  function slice(index, colour, score) {

    let radius = ((score/100) * (size/2 - 10));;
    let counterClockwise = false;
    let startAngleBlue = ((index-1) / 10) * Math.PI * 2;
    let endAngleBlue = (index / 10) * Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngleBlue, endAngleBlue, counterClockwise);
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = size/200;
    ctx.stroke();

  }

  const svg = canvas.toBuffer("image/svg+xml");
  return svg

}