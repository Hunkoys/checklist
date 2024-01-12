import fs from 'fs/promises';

const DIR = 'output/storage';

const READ = async (filename, callback) => {
  await fs
    .open(`${DIR}/${filename}`, 'r')
    .then((file) => {
      file.readFile({ encoding: 'utf-8' }).then(callback);
      file.close();
    })
    .catch(console.log);
};
const SAVE = async (filename, content) => {
  await fs
    .open(`${DIR}/${filename}`, 'w')
    .then((file) => {
      file.writeFile(content);
      file.close();
    })
    .catch(console.log);
};
const APPEND = async (filename, content) => {
  await fs
    .open(`${DIR}/${filename}`, 'a')
    .then((file) => {
      file.appendFile(content);
      file.close();
    })
    .catch(console.log);
};
const DELETE = Symbol('DELETE');

const q = {};
function queue(filename) {
  if (!q[filename]) {
    q[filename] = [];
  }
  return q[filename];
}

export default {
  read: (filename, callback) => {
    queue(filename).push(new Command(READ, callback));
    startDraining(filename);
  },
  save: (filename, content) => {
    queue(filename).push(new Command(SAVE, content));
    startDraining(filename);
  },
  append: (filename, content) => {},
  delete: (filename) => {},
};

class Command {
  constructor(command, ...data) {
    this.command = command;
    this.data = data;
  }
}

const draining = {};

function startDraining(filename) {
  if (draining[filename]) return;

  draining[filename] = true;
  drain(filename);
}

function drain(filename) {
  if (queue(filename)[0]) {
    const action = queue(filename).shift();
    action.command(filename, ...action.data).then(() => drain(filename));
  } else {
    draining[filename] = false;
  }
}
