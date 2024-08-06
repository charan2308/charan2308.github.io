const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;

const flowers = [];
const colors = [
    { petal: 'rgba(255, 105, 180', center: 'rgba(255, 69, 0' },    // Hot Pink, Orange Red
    { petal: 'rgba(135, 206, 250', center: 'rgba(70, 130, 180' },   // Light Sky Blue, Steel Blue
    { petal: 'rgba(240, 128, 128', center: 'rgba(255, 160, 122' },  // Light Coral, Light Salmon
    { petal: 'rgba(144, 238, 144', center: 'rgba(34, 139, 34' },    // Light Green, Forest Green
    { petal: 'rgba(221, 160, 221', center: 'rgba(138, 43, 226' },   // Plum, Blue Violet
    { petal: 'rgba(255, 182, 193', center: 'rgba(255, 105, 180' },  // Light Pink, Hot Pink
    { petal: 'rgba(250, 128, 114', center: 'rgba(255, 99, 71' },    // Salmon, Tomato
    { petal: 'rgba(173, 216, 230', center: 'rgba(0, 191, 255' },    // Light Blue, Deep Sky Blue
    { petal: 'rgba(152, 251, 152', center: 'rgba(0, 128, 0' },      // Pale Green, Green
    { petal: 'rgba(255, 240, 245', center: 'rgba(255, 20, 147' }    // Lavender Blush, Deep Pink
];
let colorIndex = 0;

const backgroundImage = new Image();
backgroundImage.src = 'final.jpeg';  // Replace with the path to your image

function drawFlower(x, y, opacity) {
    colorIndex++;
    const currentColor = colors[colorIndex % colors.length];

    // Draw petals with gradient
    const petalGradient = ctx.createRadialGradient(x, y, 5, x, y, 40);
    petalGradient.addColorStop(0, `${currentColor.petal}, ${opacity})`);
    petalGradient.addColorStop(1, `${currentColor.petal}, 0)`);
    ctx.fillStyle = petalGradient;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
        ctx.ellipse(x, y, 40, 15, (Math.PI / 4) * i, 0, 2 * Math.PI);
    }
    ctx.fill();

    // Draw flower center with gradient
    const centerGradient = ctx.createRadialGradient(x, y, 3, x, y, 10);
    centerGradient.addColorStop(0, `${currentColor.center}, ${opacity})`);
    centerGradient.addColorStop(1, `${currentColor.center}, ${opacity / 2})`);
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
}

function clearFlower(x, y) {
    ctx.clearRect(x - 40, y - 40, 80, 80);
}

function isCanvasFilled() {
    return flowers.length >= 510; // Adjust this value if needed
}

function drawBackground() {
    document.getElementById("message").innerHTML = "Now uncover your message";
    // Calculate dimensions and position for the image
    const imageWidth = canvas.width / 2;
    const imageHeight = (backgroundImage.height / backgroundImage.width) * imageWidth;
    const xOffset = (canvas.width - imageWidth) / 2;
    const yOffset = (canvas.height - imageHeight) / 2;

    ctx.drawImage(backgroundImage, xOffset, yOffset, imageWidth, imageHeight);


    // Draw text below the image
    const text = "Happy Cutie day to my dear chikkuuuuuuuuuu!";
    const text2 = "Thank you for always beiing by my side beautiful!";
    const textWidth = ctx.measureText(text).width;
    const textX = (canvas.width - textWidth) / 2;
    const textWidth2 = ctx.measureText(text).width;
    const textX2 = (canvas.width - textWidth2) / 2;
    const textY = yOffset + imageHeight + 40; // Position text below the image

    ctx.fillStyle = '#000000'; // Text color
    ctx.font = '30px Comic Sans MS'; // Font style and size
    ctx.textAlign = 'left';
    ctx.fillText(text, textX, textY);
    ctx.fillText(text2, textX2, textY + 40);
}

function moveFlowers(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();  // Draw the background image

    flowers.forEach(flower => {
        const dx = x - flower.x;
        const dy = y - flower.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            flower.x -= Math.cos(angle) * 2;
            flower.y -= Math.sin(angle) * 2;
        }

        drawFlower(flower.x, flower.y, 1);
    });
}

backgroundImage.onload = () => {
    canvas.addEventListener('mousemove', (event) => {
        if (!isCanvasFilled()) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            let flowerExists = false;
            flowers.forEach(flower => {
                const distance = Math.sqrt((x - flower.x) ** 2 + (y - flower.y) ** 2);
                if (distance < 20) {
                    flowerExists = true;
                    flower.visible = false;
                }
            });

            if (!flowerExists) {
                const lastFlower = flowers[flowers.length - 1];
                let opacity = 1;
                // if (lastFlower) {
                //     opacity = lastFlower.opacity - 0.1;
                //     if (opacity <= 0.4) {
                //         opacity = 1;
                //     }
                // }
                flowers.push({ x, y, visible: true, opacity });
                drawFlower(x, y, opacity);
            }
        } else {
            moveFlowers(event);
        }
    });
};
