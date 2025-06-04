let fondoImg = null;
let controllerBanner = null;
let mostrarInstrucciones = false;

let estado = "menu";
let transicionAlpha = 0;
let transicionInicio = null;

let imgBtnJugar;
let imgBtnInstrucciones;
let imgLogo;

let btnJugar = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};

let btnInstrucciones = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};

const menuSketch = (p) => {
  p.preload = () => {
    fondoImg = p.loadImage("public/assets/wallpaper/menu/0.png");
    controllerBanner = p.loadImage("public/assets/controlesBanner.png");

    imgBtnJugar = p.loadImage("public/assets/btnStart.png");
    imgBtnInstrucciones = p.loadImage("public/assets/btnInstructions.png");

    imgLogo = p.loadImage("public/assets/galaga.png");
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    btnJugar.w = 400;
    btnJugar.h = 160;

    btnInstrucciones.w = 300;
    btnInstrucciones.h = 120;

    recalcularBotones(p);
  };

  p.draw = () => {
    p.background(0);

    if (fondoImg) p.image(fondoImg, 0, 0, p.width, p.height);

    // dibujo logo
    if (imgLogo) {
      const logoWidth = 500;
      const logoHeight = (imgLogo.height / imgLogo.width) * logoWidth;
      p.image(imgLogo, p.width / 2 - logoWidth / 2, 20, logoWidth, logoHeight);
    }

    if (estado === "menu") {
      p.image(imgBtnJugar, btnJugar.x, btnJugar.y, btnJugar.w, btnJugar.h);
      p.image(
        imgBtnInstrucciones,
        btnInstrucciones.x,
        btnInstrucciones.y,
        btnInstrucciones.w,
        btnInstrucciones.h
      );

      // modal instrucciones
      if (mostrarInstrucciones && controllerBanner) {
        const modalW = controllerBanner.width + 40;
        const modalH = controllerBanner.height + 60;
        const modalX = p.width / 2 - modalW / 2;
        const modalY = p.height / 2 - modalH / 2;

        p.fill(50, 50, 50, 220);
        p.noStroke();
        p.rect(modalX, modalY, modalW, modalH, 20);

        p.image(controllerBanner, modalX + 20, modalY + 20);

        p.fill(220);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(16);
        p.text(
          "Haz clic afuera para cerrar",
          modalX + modalW / 2,
          modalY + 20 + controllerBanner.height + 10
        );
      }
    }

    // estado de transicion para lvl 1
    if (estado === "transicion") {
      //console.log("transisao");
      p.fill(0, transicionAlpha);
      p.rect(0, 0, p.width, p.height);

      p.fill(255, transicionAlpha);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(48);
      p.text("Nivel 1", p.width / 2, p.height / 2);

      if (transicionAlpha < 255) {
        transicionAlpha += 5;
      } else if (p.millis() - transicionInicio > 2000) {
        window.location.href = "core.html";
      }
    }
  };

  p.mousePressed = () => {
    if (estado === "menu") {
      if (mostrarInstrucciones && controllerBanner) {
        const modalW = controllerBanner.width + 40;
        const modalH = controllerBanner.height + 60;
        const modalX = p.width / 2 - modalW / 2;
        const modalY = p.height / 2 - modalH / 2;

        if (
          p.mouseX < modalX ||
          p.mouseX > modalX + modalW ||
          p.mouseY < modalY ||
          p.mouseY > modalY + modalH
        ) {
          mostrarInstrucciones = false;
          return;
        }
      }

      if (
        p.mouseX > btnJugar.x &&
        p.mouseX < btnJugar.x + btnJugar.w &&
        p.mouseY > btnJugar.y &&
        p.mouseY < btnJugar.y + btnJugar.h
      ) {
        estado = "transicion";
        transicionAlpha = 0;
        transicionInicio = p.millis();
      }

      if (
        p.mouseX > btnInstrucciones.x &&
        p.mouseX < btnInstrucciones.x + btnInstrucciones.w &&
        p.mouseY > btnInstrucciones.y &&
        p.mouseY < btnInstrucciones.y + btnInstrucciones.h
      ) {
        mostrarInstrucciones = true;
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    recalcularBotones(p);
    //console.log("recalculao")
  };
};

function recalcularBotones(p) {
  btnJugar.x = p.width / 2 - btnJugar.w / 2;
  btnJugar.y = p.height / 2 - btnJugar.h - 20;

  btnInstrucciones.x = p.width / 2 - btnInstrucciones.w / 2;
  btnInstrucciones.y = p.height / 2 + 20;
}

new p5(menuSketch);
