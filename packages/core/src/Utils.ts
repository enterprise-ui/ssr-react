export function setInitialRender(isServer: boolean) {
    if (!isServer) {
        window.__SSR_INITIAL_RENDER__ = false;
    }
}

export const isInitialRender = (isServer: boolean) => (!isServer ? window.__SSR_INITIAL_RENDER__ : false);
