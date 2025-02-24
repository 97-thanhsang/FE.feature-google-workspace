const elInput = document.getElementById("avatar");
// const uploadBtn = document.getElementById("upload");
const uploadSubmit = document.getElementById("form-submit");

const img = document.getElementById("image-preview");

const postData =[];


elInput.addEventListener("change", () => {
    const file = elInput.files;
    const fileList = Array.from(file);

    fileList.forEach((file, index) => {
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            const data = reader.result.split(",")[1];
            postData[index] = {
                name : file.name,
                type : file.type,
                data : data
            };
        });
    });    
    console.log("🚀 ~ reader.addEventListener ~ postData:", postData)
});

uploadSubmit.addEventListener("click", (e) => {
    postFile(postData);
});

// uploadBtn.addEventListener("click", () => {
//     console.log(postData);
//     postFile(postData);
// });

async function postFile(postData){
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycby5a2KLu-IPc8YIu6BTxwP1Y6MghuSe_K7NfM2mgId47rwkXpGaJPmWqV0q7_o3JHJpFQ/exec", {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log("🚀 ~ postFile ~ data", data);
        //return response.json();
    } catch (error) {
        alert('Error: ' + error);
    }


}