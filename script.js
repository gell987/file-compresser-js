let uploadBox = document.querySelector(".upload-box");
let previewImg = document.querySelector("img");
let fileInp = document.querySelector("input");
let heightInp = document.querySelector(".height input");
let widthInp = document.querySelector(".width input");
let ratioInp = document.querySelector(".ratio input");

let qualityInp = document.querySelector(".quality input");
let downloadBtn = document.querySelector(".download-btn");

var imgRatio;

const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    widthInp.value = previewImg.naturalWidth;
    heightInp.value = previewImg.naturalHeight;
    imgRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
  });
};

widthInp.addEventListener("keyup", () => {
  // getting height according to the ratio checkbox status
  const height = ratioInp.checked ? widthInp.value / imgRatio : heightInp.value;
  heightInp.value = Math.floor(height);
});
heightInp.addEventListener("keyup", () => {
  const width = ratioInp.checked ? heightInp.value * imgRatio : widthInp.value;
  widthInp.value = Math.floor(width);
});

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  const imgQuality = qualityInp.checked ? 0.5 : 1.0;

  canvas.width = widthInp.value;
  canvas.height = heightInp.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
};

downloadBtn.addEventListener("click", resizeAndDownload);
fileInp.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInp.click());
