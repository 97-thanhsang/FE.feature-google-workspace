import * as config from './config.js';

const cmtSubmit = document.getElementById("comment_submit");
const cmtArea = document.getElementById("comment_textarea");
const commentWrapper = document.querySelector(".comment_wrapper");

const content_post = document.getElementById("content_post");
const h1 = document.querySelector("h1");


let user = JSON.parse(localStorage.getItem(config.USER));
let currentPost;


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
    if (user) {
        const cmt = {
            user: user,
            content: cmtArea.value,
            time: getCurrentTime(),
        };
        // renderComment(cmt);
        postComment(cmt);
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
    const userLogin = {
        email,
        name,
        avatar: picture,
    };
    localStorage.setItem(config.USER, JSON.stringify(userLogin));
    return (user = userLogin);
}

async function postComment(comment) {
    const postData = {
        data :comment,
        postID : currentPost.ID,
        action : "POST_COMMENT"
    };
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwmSGXwVL6m5_IVjDruxJb3NdxuqpglqLqWBPLwmJEV2vrfBcb36BxF9PH0OYMmrzVU/exec",
        {
            method: "POST",
            body: JSON.stringify(postData),
        });
    const data = await response.json();
    renderComment(data);
    console.log("🚀 ~ postComment ~ data:", data)
}


async function fetchPost() {
  const response = await fetch(
    `https://script.google.com/macros/s/AKfycbwmSGXwVL6m5_IVjDruxJb3NdxuqpglqLqWBPLwmJEV2vrfBcb36BxF9PH0OYMmrzVU/exec`
  );
  const data = await response.json();
  currentPost = data[5];
  renderPost(currentPost);
}
fetchPost();

function renderPost(){
    content_post.innerHTML = currentPost.content;
    h1.innerHTML = currentPost.title;
    let comments = currentPost.comments;
    if (comments.length > 0) {
        comments = JSON.parse(comments);
    }
    else
    {
        return;
    }
    comments.forEach((cmt,index) => {
        renderComment(cmt);
    });
}