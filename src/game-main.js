import Phaser from "phaser";
import GameScene from "./Scenes/GameScene";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: "phaser-game",
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        GameScene
    ]
};

export const StartGame = () => {
    return new Phaser.Game(config);
};
