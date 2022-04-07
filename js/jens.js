let btnDownload = document.querySelector('#jensbutton');


// Must use FileSaver.js 2.0.2 because 2.0.3 has issues.
btnDownload.addEventListener('click', () => {
    let imagePath = "../Images/OneThousandAndOneNights.png";
    let fileName = getFileName(imagePath);  
    saveAs(imagePath, fileName);
});

function getFileName(str) {
    return str.substring(str.lastIndexOf('/') + 1)
}
