import pipeline         from 'when/pipeline';

import expressSpec      from './express.spec';
import { createTask }   from './utils/tasks';

import Timer            from './utils/timer';
import chalk            from 'chalk';

let timer = new Timer();

pipeline([createTask(expressSpec)]).then(context => {
    console.log(chalk.blue("Wiring time: " + timer.end()));
}).otherwise(error => console.error("ERROR:::", error));