TypeScript
interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => void;
}

class CLI {
  private commands: Command[] = [];

  addCommand(command: Command) {
    this.commands.push(command);
  }

  run(argv: string[]) {
    const [commandName, ...args] = argv;
    const command = this.commands.find((c) => c.name === commandName);
    if (command) {
      command.execute(args);
    } else {
      console.log(`Unknown command: ${commandName}`);
    }
  }
}

const cli = new CLI();

cli.addCommand({
  name: 'hello',
  description: 'Prints a hello message',
  execute: (args) => {
    console.log(`Hello, ${args.join(' ') || 'World'}!`);
  },
});

cli.addCommand({
  name: 'echo',
  description: 'Echoes the input',
  execute: (args) => {
    console.log(args.join(' '));
  },
});

if (require.main === module) {
  cli.run(process.argv.slice(2));
}