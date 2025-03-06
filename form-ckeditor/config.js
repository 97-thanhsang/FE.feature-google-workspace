const CLIENT_ID = '408628968107-jv7o607eirqnu70iaonu6hicus31c17u.apps.googleusercontent.com';

const LINK_ACCESS_TOKEN = `
https://accounts.google.com/o/oauth2/v2/auth?
 scope=https%3A//www.googleapis.com/auth/userinfo.email%20https%3A//www.googleapis.com/auth/userinfo.profile&
 response_type=token&
 redirect_uri=http://127.0.0.1:5500/feature-google-workspace/form-ckeditor/single_post.html&
 client_id=${CLIENT_ID}
`;

const ACCESS_TOKEN_KEY = 'access_token';

const USER = 'user';

export {
    CLIENT_ID,
    LINK_ACCESS_TOKEN,
    ACCESS_TOKEN_KEY,
    USER,
};
