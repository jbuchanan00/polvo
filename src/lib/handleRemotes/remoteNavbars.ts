type MountFunction = (target: HTMLElement, prop?: any) => void
import {PUBLIC_POLESTAR_URL} from '$env/static/public'

interface RemoteNavbars {
    TopNavInstance: MountFunction;
    BottomNavInstance: MountFunction;
}

const remoteUrl = 'http://localhost:5174/navbars.js';

export async function loadRemoteNavbars(): Promise<RemoteNavbars> {
    console.log('Navbars Url', PUBLIC_POLESTAR_URL)
    const remote = await import(/* @vite-ignore */ PUBLIC_POLESTAR_URL!);
    return remote
}