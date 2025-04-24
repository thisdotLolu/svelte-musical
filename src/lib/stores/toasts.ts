import { writable } from "svelte/store";
import uniqid from 'uniqid';

type ToastMessage ={
    type:'info' | 'warning' | 'error' | 'success';
    message:string;
    id:string;
}

function createToastsStore() {
    const {subscribe} = writable<ToastMessage[]>([
    {
        type:'info',
        message:'Welcome to the app!',
        id:uniqid()
    },
    {
        type:'error',
        message:'Error!',
        id:uniqid()
    },
])
    return {
        subscribe
    }
}

export default createToastsStore();