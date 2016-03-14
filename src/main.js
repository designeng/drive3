import wire         from 'essential-wire';
import pipeline     from 'when/pipeline';
import chalk        from 'chalk';

import expressSpec  from './express.spec';

import Timer    from './utils/timer';

let timer = new Timer();

const expressTask = (context) => {
    return wire(expressSpec);
}

pipeline([expressTask]).then(context => {
    console.log(chalk.blue("Wiring time: " + timer.end()));
}).otherwise(error => console.error("ERROR:::", error));