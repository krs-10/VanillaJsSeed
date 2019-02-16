
require("./styles/skeleton.css");
require("./styles/main.css");
import { ExpandingList } from './components';

import Navigo from 'navigo';


const PageTemplate = document.createElement('main');

const getPage = async (url) => {
    const page = await fetch(`${window.location.origin}/${url}`);
    return page.text().then((innerText) => {
        PageTemplate.innerHTML = innerText;
        document.body.appendChild(PageTemplate);
    })
};

const router = new Navigo(window.location.origin, true);


router.on({
    '/one': () => { getPage('routes/pageone.html'); },
    // 'secondroute': () => { loadHTML('./templates/second.html', 'view'); },
    // 'thirdroute': () => { loadHTML('./templates/third.html', 'view'); }
})

// router.resolve()


