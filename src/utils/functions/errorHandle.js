
export const onHandleUnauthorizedError = () => {
    localStorage.clear();
    window.location.reload();
}