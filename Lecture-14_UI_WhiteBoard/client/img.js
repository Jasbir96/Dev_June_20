let upload = document.querySelector("#upload");
upload.addEventListener("change", function (e) {
    let uInp = document.querySelector("input[type='file']");
    // any image is selected
    // let changed = false;
    let container = createBox();
    let file = uInp.files[0];
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.setAttribute("class", "upload-img");
    container.appendChild(img);
    //  remove
    uInp.value = null;
    // const reader = new FileReader();
    // reader.readAsDataURL(upload.files[0]);    
    //  using file Reader
    // reader.onload = function () {
    //     img.src = reader.result;
    // }
})
let download = document.querySelector("#download");
download.addEventListener("click", function () {
    let a = document.createElement("a");
    a.href = board.toDataURL('image/png');
    a.download = 'file.png';
    a.click();
    a.remove();
}
)
