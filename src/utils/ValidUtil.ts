export function isValidUsername(username:string) {
    const usernameRegex = /^[A-Za-z0-9]+$/;
    return usernameRegex.test(username);
}
