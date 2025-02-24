const elInput = document.getElementById("avatar");
const uploadBtn = document.getElementById("upload");
const img = document.getElementById("image-preview");


uploadBtn.addEventListener("click", () => {
    const file = elInput.files[0];
    if (!file) {
        return elInput.click();
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
        //console.log("🚀 ~ uploadBtn.addEventListener ~ reader:", reader)
        const data = reader.result.split(",")[1];
        const postdata = {
            name : file.name,
            type : file.type,
            data : data
        };
        console.log("🚀 ~ reader.addEventListener ~ postdata:", postdata)
        postFile(postdata);
    });
});

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
        img.src = data.link + "&sz=s500";
        console.log("🚀 ~ postFile ~ data", data);
        //return response.json();
    } catch (error) {
        alert('Error: ' + error);
    }


}