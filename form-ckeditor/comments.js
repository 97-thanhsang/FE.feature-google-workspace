import * as config from './config.js';

const cmtSubmit = document.getElementById("comment_submit");
const cmtArea = document.getElementById("comment_textarea");
const commentWrapper = document.querySelector(".comment_wrapper");

const cmts = [];
let user;

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
    user = JSON.parse(localStorage.getItem(config.USER));
    if (user) {
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
        cmtArea.value = "";
    } else {
        redirectLogin();
    }
});

function redirectLogin() {
    window.location.href = config.LINK_ACCESS_TOKEN;
}

function getAccessToken() {
    const savedToken = localStorage.getItem(config.ACCESS_TOKEN_KEY);
    if (savedToken) {
        getUserInfo(savedToken);
    } else {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        if (!accessToken) {
            return;
        }
        localStorage.setItem(config.ACCESS_TOKEN_KEY, accessToken);
        getUserInfo(accessToken);
    }
}

getAccessToken();

async function getUserInfo(accessToken) {
    if (!accessToken) {
        return;
    }
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
    const data = await response.json();
    const { email, name, picture } = data;
    const user = {
        email,
        name,
        avatar: picture,
    };
    localStorage.setItem(config.USER, JSON.stringify(user));
}