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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function generateSvg(inputs) {

  const size = 500;
  const canvas = createCanvas(size, size, 'svg');
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  slice(0, '#D2B7A5', inputs[0])
  slice(1, '#D9A5B3', inputs[1])
  slice(2, '#A3C6C7', inputs[2])
  slice(3, '#D2A8C4', inputs[3])
  slice(4, '#C4D6A5', inputs[4])
  slice(5, '#B9C6D3', inputs[5])
  slice(6, '#E0B8A3', inputs[6])
  slice(7, '#C8D8B1', inputs[7])
  slice(8, '#C6A3D2', inputs[8])
  slice(9, '#A9D3C7', inputs[9])


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