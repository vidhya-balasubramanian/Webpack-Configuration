import HelloWorldButton from './components/hello-world-button/hello-world-button';
import Heading from './components/heading/heading';


const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
const heading = new Heading();
heading.render();

if (process.env.NODE_ENV === "production") {
    console.log("This is production environment");
} else if (process.env.NODE_ENV === "development") {
    console.log("This is development environment");
} else {
    console.log("This is none environment");
}