export const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

export const deleteCookies = (arr: string[]) => {
    arr.forEach(el => {
        document.cookie = el + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    })
};