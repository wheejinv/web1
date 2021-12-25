// type Test = () => void
import"../css/mainStyle.scss"

export {};

declare global {
    interface Window {
        test: () => void
    }
}

let test = () => {
    console.log("Hi Dev Server");
}

window.test = test;