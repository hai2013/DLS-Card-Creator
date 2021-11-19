var uploaded = '';

function value(el) {
    return document.getElementById(el).value;
};

function drawCard(change) {
    var card = document.getElementById('card');
    var ctx = card.getContext('2d');

    ctx.clearRect(0, 0, ctx.width, ctx.height);

    var template = new Image();
    var positionImage = new Image();
    var footImage = new Image();

    template.onload = function () {
        positionImage.onload = function () {
            ctx.drawImage(positionImage, 202, 87);
            if (change === true) {
                if (document.getElementById('fileUpload').value != '') {
                    var file = document.getElementById('fileUpload').files[0];
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        uploaded = reader.result;
                        upload.src = uploaded;
                    }
                    reader.readAsDataURL(file);
                }
            } else {
                upload.src = uploaded;
            }
        };
        footImage.onload = function () {
            ctx.drawImage(footImage, 365, 25);
        };

        positionImage.src = `./assets/position/${value('position')}.png`
        footImage.src = `./assets/foot/${value('cardType')}/${value('footColor')}.png`

        var upload = new Image();
        upload.onload = function () {
            // Uploaded Image
            ctx.drawImage(upload, 18, 32, 224, 224);
        };

        // Card Template
        ctx.drawImage(template, 0, 0);

        /**
        // Nationality
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(202, 123, 46, 29);
        **/

        // First Name
        ctx.textAlign = 'center'
        ctx.fillStyle = '#777a85';
        ctx.font = '16px Renogare';
        ctx.fillText(value('firstName'), 130, 277);

        // Last Name
        ctx.fillStyle = '#ffffff';
        ctx.font = '25px Renogare';
        ctx.fillText(value('lastName'), 130, 301);

        // Stats
        ctx.font = '22px Renogare';
        var coordinates = [[335, 103], [335, 150], [335, 197], [335, 243], [434, 103], [434, 150], [434, 197], [434, 243]];
        for (var i = 1; i < 9; i++) {
            if (value(`stats${i}`) > 0 && value(`stats${i}`) <= 59) {
                ctx.fillStyle = '#d9342b';
            } else if (value(`stats${i}`) > 59 && value(`stats${i}`) <= 69) {
                ctx.fillStyle = '#e08835';
            } else if (value(`stats${i}`) > 69 && value(`stats${i}`) <= 79) {
                ctx.fillStyle = '#eadd4c';
            } else if (value(`stats${i}`) > 79 && value(`stats${i}`) <= 89) {
                ctx.fillStyle = '#5eca3d';
            } else if (value(`stats${i}`) > 89 && value(`stats${i}`) <= 100) {
                ctx.fillStyle = '#62d0c7';
            }

            if (value(`stats${i}`) == 100) {
                ctx.save();
                ctx.translate(coordinates[i - 1][0], coordinates[i - 1][1]);
                ctx.save();
                ctx.scale(0.85, 1);
                ctx.fillText(value(`stats${i}`), 0, 0);
                ctx.restore();
                ctx.restore();
            } else {
                ctx.fillText(value(`stats${i}`), coordinates[i - 1][0], coordinates[i - 1][1]);
            }
        }

        /**
        if (value('cardType') == 'legendary') {
            ctx.beginPath();
            ctx.arc(222, 41, 41, 0, 2 * Math.PI);
            ctx.fillStyle = '#edd965';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(222, 41, 37, 0, 2 * Math.PI);
            ctx.fillStyle = '#e0c159';
            ctx.fill();
        } else if (value('cardType') == 'rare') {
            ctx.beginPath();
            ctx.arc(222, 41, 41, 0, 2 * Math.PI);
            ctx.fillStyle = '#6dc2fa';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(222, 41, 37, 0, 2 * Math.PI);
            ctx.fillStyle = '#60ade1';
            ctx.fill();
        } else if (value('cardType') == 'common') {
            ctx.beginPath();
            ctx.arc(222, 41, 41, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(222, 41, 37, 0, 2 * Math.PI);
            ctx.fillStyle = '#e1e1e1';
            ctx.fill();
        }
        */

        // Rating Circle
        ctx.beginPath();
        ctx.arc(222, 41, 31, 0, 2 * Math.PI);
        if (value('rating') > 0 && value('rating') <= 59) {
            ctx.fillStyle = '#d0504b';
        } else if (value('rating') > 59 && value('rating') <= 69) {
            ctx.fillStyle = '#de8735';
        } else if (value('rating') > 69 && value('rating') <= 79) {
            ctx.fillStyle = '#eed94a';
        } else if (value('rating') > 79 && value('rating') <= 89) {
            ctx.fillStyle = '#63d041';
        } else if (value('rating') > 89 && value('rating') <= 100) {
            ctx.fillStyle = '#5697cd';
        }
        ctx.fill();

        // Rating
        ctx.fillStyle = '#1d2234';
        ctx.font = '28px Renogare';
        ctx.fillText(value('rating'), 222, 52);

        // Height
        ctx.textAlign = 'left'
        ctx.fillStyle = '#1d2234';
        ctx.font = '23px Renogare';
        ctx.fillText(value('height'), 304, 56);

        // Foot
        ctx.fillText(value('foot'), 414, 56);
    };

    // Card Type
    if (value('position') == 'GK') {
        template.src = `./assets/card/${value('cardType')}GK.png`;
    } else {
        template.src = `./assets/card/${value('cardType')}.png`;
    }
};