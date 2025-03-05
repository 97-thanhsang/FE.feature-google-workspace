const cmtSubmit = document.getElementById("comment_submit");
const cmtArea = document.getElementById("comment_textarea");
const commentWrapper = document.querySelector(".comment_wrapper");

const cmts = [];

function getCurrentTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

function renderComment(comment) {
    

    const newComment = `
        <div class="comment_item">
            <p>
                <a href="">
                    <img src="${comment.user.avatar}" alt="">
                    <span>${comment.user.name}</span>
                </a>
                <span>${comment.time}</span>
            </p>
            <p>${comment.content}</p>
        </div>
    `;

    commentWrapper.insertAdjacentHTML("afterbegin", newComment);
}

cmtSubmit.addEventListener("click", function () {
    const cmtValue = cmtArea.value;
    const cmt = {
        id: "",
        user: {
            avatar: "https://yt3.ggpht.com/yti/ANjgQV-nvpnWAHGCC1AEpzAgVBSoCSSsXKObP9W0XZP8HziOqeY=s88-c-k-c0x00ffffff-no-rj",
            name: "Nguyen Thanh Sang",
            email: "",
        },
        content: cmtValue,
        time: getCurrentTime(),
    };
    renderComment(cmt);
});
