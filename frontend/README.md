[](javascript:void\(0\);)[](javascript:void\(0\);)

[](javascript:void\(0\);)

[](javascript:void\(0\);)

[Welcome, ](javascript:void\(0\);)**MetaPortal** 

- [Start](#documenter_cover)
- [Features](#features)
- [React.js](#react_js)
- [Main Content](#main_content)
- [Create a Page](#create_page)
- [Folder Structure](#folder_structure)
- [Credits](#Credits)
- [Layout](#layout)
- [Mail](#mail)
- [THANK YOU!](#thank_you)
# **Documentation**
1. [MetaPortal ]()
1. Documentation 
#### **MetaPortal - NFT Portfolio and Landing Page React Nextjs Template** 
MetaPortal is a one page style personal portfolio template that can be used to build your personal portfolio website. You can choose MetaPortal to build your online presence. It is very important to have a personal portfolio at current age. In your professional career you must need to have a personal portfolio. MetaPortal is a great template to build your personal portfolio using MetaPortal . 
## **Main Features**
- Develop with [NextJs](https://nextjs.org/)
- Fully Responsive
- Ready to used widget
- Detailed Documentation
## **React.JS Installation & Setup A JavaScript library for building user interfaces.**
**Installing**

Make sure if NODEJS is installed on your computer

Run npm install -g create-react-app command from your teminal to install React Globally. 

**Install npm :-**
Run npm install command from your project directory. It will create 'node\_module' folder in this all dependency files will be install with this command. 

**Run Project :-**
Run npm run dev command from your project directory. With is command file will be compiled and it will be loaded on local server `http://localhost:3000`. 

**Production Build :-**
Run npm run build Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. 

**Further help :-**
To get more help on the nextjs.js checkout [nextjs](https://nextjs.org/)

**Note:** You can learn more in the [Create Next App Documentation](https://github.com/vercel/next.js). To learn Next, check out the [Next Documentation](https://nextjs.org/). 
## **Main Content**
##### **\_app.js Structure**
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

`  `return <Component {...pageProps} />

}

export default MyApp
## **Create a Page**
##### **How to create a custom page**
\1. Create page component pages\MyPage.js

import React from "react";

export function MyPage() {

`  `return(

`   `<h1>Hello!</h1>

`  `) 

} 							


## **Folder Structure**
- [](javascript:void\(0\);)
- [](javascript:void\(0\);)
  - [Action](javascript:void\(0\);)
  - [Another Action](javascript:void\(0\);)
  - [Something else](javascript:void\(0\);)
##### **Folder Directories**
- public 
  - css
  - demo
  - fonts
  - img
- src 
  - components 
    - About.js
    - AnimatedText.js
    - Contact.js
    - Home.js
    - Blog.js
    - BlogPopup.js
    - Work.js
    - WorkSideBar.js
  - layouts 
    - Header.js
    - Layouts.js
    - MobileHeader.js
    - BackMobile.js
    - PreLoader.js
    - Switcher.js
  - useClickOutside.js
  - useWindowSize.js
- pages 
  - index.js
- package.json
## **Credits**
- Nextjs [Click to See](https://nextjs.org/)
- Google fonts are used in the template. [Click to see](https://fonts.google.com/)
- All Images are used: [Pexels.com](https://www.pexels.com/)
- Emailjs [Click to See](https://www.emailjs.com/)
- emailjs-com [Click to See](https://www.npmjs.com/package/emailjs-com)
- React bootstrap [Click to See](https://react-bootstrap.github.io/)
- react-moving-text [Click to See](https://www.npmjs.com/package/react-moving-text)
## **Layout Layout is controlled by settings object LayoutSettings inside src/context/ThemeContext.js**
**Layout.js**

`  `import Head from "next/head";

`  `import { Fragment, useContext, useEffect } from "react";

`  `import ColorContext from "../context/colorContext";

`  `import NavContext from "../context/navContext";

`  `import useWindowSize from "../useWindowSize";

`  `import BackMobile from "./BackMobile";

`  `import Header from "./Header";

`  `import Switcher from "./Switcher";



`  `const Layouts = ({ children, bodyCls, extraPage, light }) => {

`    `useEffect(() => {

`      `document.querySelector("body").classList = bodyCls

`        `? bodyCls

`        `: "dark fullscreendark";

`    `}, []);

`    `const { changeMobileMenu, mobileMenu } = useContext(NavContext);

`    `const { color } = useContext(ColorContext);

`    `const { width } = useWindowSize();

`    `useEffect(() => {

`      `if (width > 1025) {

`        `changeMobileMenu(false);

`      `}

`    `}, [width]);

`    `return (

`      `<Fragment>

`        `<Head>

`          `<link

`            `type="text/css"

`            `media="all"

`            `href={`css/skins/${color}.css`}

`            `rel="stylesheet"

`          `/>{" "}

`        `</Head>

`        `<div className="page animated" style={{ animationDuration: "500ms" }}>

`          `<Switcher />

`          `{/\* Header Starts \*/}

`          `{!extraPage && <Header light={light} />}

`          `{/\* Main Content Starts \*/}{" "}

`          `{extraPage ? (

`            `children

`          `) : (

`            `<main

`              `id="main"

`              `className={`${width < 1025 ? (mobileMenu ? "open" : "") : ""}`}

`            `>

`              `{/\* Back To Home Starts [ONLY MOBILE] \*/}

`              `<BackMobile

`                `changeMobileMenu={changeMobileMenu}

`                `mobileMenu={mobileMenu}

`              `/>

`              `{children}

`            `</main>

`          `)}



{" "} ); }; export default Layouts; 

[1. EmailJs](https://www.emailjs.com/)

![](Aspose.Words.1dc0eb71-8dcc-4f88-ad61-d06bcf28f04c.001.png) 

[2.]()

![](Aspose.Words.1dc0eb71-8dcc-4f88-ad61-d06bcf28f04c.001.png) 

[3. ]()

![](Aspose.Words.1dc0eb71-8dcc-4f88-ad61-d06bcf28f04c.001.png) 

[4. ]()

![](Aspose.Words.1dc0eb71-8dcc-4f88-ad61-d06bcf28f04c.001.png) 

[Video reference ]()
## **Thank You!**
Once again, thank you so much for purchasing this template. As I said at the beginning, I'd be glad to help you if you have any questions relating to this template. 

**REGULAR SUPPORT** : You have in template support if you face any issue with the usage of it then you can contact us on below Email ID. 

**EXTENDED SUPPORT** : Development it is chargeable according to your requirement. For that you need to mail us your requirement on below Email ID. 

**COST OF SERVICE** : Depends on the hours required. But as you are already using our template we have discounted rates for our template customer. 

**EXTENDED LICENSE** : With the Extended Support we also include Extended License. So you save much more with your investment than you will with purchasing Regular License and later buying Extended one + Development cost. 

You will get a quick reply from our team and feel free to contact us. We donâ€™t charge for requirement discussion so donâ€™t worry. 

--> 
