#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let enemies: string[] = ["Assasin", "Skeleton", "Zombie", "Dragon"];
let maxEnemyHealth: number = 75;
let enemyAttackDamage: number = 25;

let health: number = 100;
let attackDamage: number = 50;
let numHealthPotions: number = 3;
let healthPotionHealAmt: number = 30;
let healthPotionDropChance: number = 50; //percent
let playerLevel: number = 1;

let running: boolean = true;

let getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * max - min) + min;
};
console.log("\t---------------------");
console.log(chalk.blue.bold("\tWelcome to Mystery!"));

GAME: while (running) {
  console.log("\t---------------------");
  let enemyHealth: number = getRandomNumber(1, maxEnemyHealth);
  let enemy: string = enemies[getRandomNumber(0, enemies.length - 1)];

  console.log(`\t# ${enemy} has appeared #\n`);

  while (enemyHealth > 0) {
    console.log(`\t#Your HP: ${health}#`);
    console.log(`\t#${enemy} HP: ${enemyHealth}#`);

    let control = await inquirer.prompt({
      message: "\n\tWhat would you like to do?\n",
      type: "list",
      choices: ["Attack", "Drink health Potion", "Run"],
      name: "command",
    });

    switch (control.command) {
      case "Attack":
        let strikeDamage: number = getRandomNumber(1, attackDamage);
        let damageTaken: number = getRandomNumber(1, enemyAttackDamage);

        health -= damageTaken;
        enemyHealth -= strikeDamage;

        console.log(
          chalk.green(`\tYou strike the ${enemy} with ${strikeDamage} damage. `)
        );
        console.log(
          chalk.red(`\tYou recieved ${damageTaken} damage from the enemy.`)
        );

        if (health < 1) {
          console.log(`\tYou have too much damage. You are too weak to go on.`);
          break;
        }

        break;

      case "Drink health Potion":
        if (numHealthPotions > 0) {
          health += healthPotionHealAmt;
          numHealthPotions--;
          console.log(
            `\tYou drank the potion, healing yourself for ${healthPotionHealAmt}.\n You now have ${health} HP\n\tYou now have ${numHealthPotions} left.`
          );
        } else {
          console.log(
            `\tYou have no health potions left, defeat enemy fro a chance to get one`
          );
        }
        break;

      case "Run":
        console.log(`\tYou ran away from the ${enemy}.`);
        continue GAME;

        break;
    }
  }

  if (health < 1) {
    console.log(`\tYou limp out of the Mystery, weak from battle.`);
    break;
  }

  console.log("\t ----------------------------");
  console.log(chalk.green(`\n\t#  ${enemy} has been defeated #`));
  console.log(`\t# You have ${health} HP left #\n`);
  playerLevel++;
  console.log(`\t# Your player level is now level ${playerLevel}. #\n`);

  if (getRandomNumber(1, 100) < healthPotionDropChance) {
    numHealthPotions++;
    console.log(`\t# The ${enemy} dropped a health potion #`);
    console.log(`\t# You now have ${numHealthPotions} health potion(s) #`);
  }

  let stateControl = await inquirer.prompt({
    message: "\n\tWhat would you like to do?\n",
    type: "list",
    choices: ["\tContinue Fighting", "\tExit Mystery"],
    name: "command",
  });

  if (stateControl.command == "\tContinue Fighting") {
    console.log(`\n\tYour adventure continues!`);
  } else {
    console.log(`\n\tYou exit the Mystery successfully from your adventure.`);

    break;
  }
}

console.log(`\n\t#####################`);
console.log(chalk.blue.bold(`\tTHANKYOU FOR PLAYING!`));
console.log(`\t#####################`);
