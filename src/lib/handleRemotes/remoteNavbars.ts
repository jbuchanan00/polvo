type MountFunction = (target: HTMLElement, prop?: any) => void

interface RemoteNavbars {
    TopNavInstance: MountFunction;
    BottomNavInstance: MountFunction;
}

const remoteUrl = 'http://localhost:5174/navbars.js';

export async function loadRemoteNavbars(): Promise<RemoteNavbars> {
    const remote = await import(/* @vite-ignore */ remoteUrl);
    return remote
}