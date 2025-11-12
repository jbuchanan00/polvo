type MountFunction = (target: HTMLElement, prop?: any) => void
import {PUBLIC_POLESTAR_URL} from '$env/static/public'

interface RemoteNavbars {
    TopNavInstance: MountFunction;
    BottomNavInstance: MountFunction;
}

export async function loadRemoteNavbars(): Promise<RemoteNavbars> {
    const remote = await import(/* @vite-ignore */ PUBLIC_POLESTAR_URL!);
    return remote
}