class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    init(data) {
        this.chosenCharacter = data.chosenCharacter;
    }

    preload() {
        this.cameras.main.fadeIn(800, 0, 0, 0);
        this.cameras.main.setBackgroundColor('#000');
        this.personalScale = (this.scale.height + this.scale.width) / 2200;
        const progressBar = this.add.graphics();
        const chargingBar = this.add.image(this.scale.width / 2, this.scale.height / 2 + 90 * this.personalScale * 0.8 + 40*this.personalScale, 'chargingBarFrame').setOrigin(0.5).setScale(this.personalScale * 0.8);
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xff0000, 1);

            let fillWidth = 2 * 290 * value * this.personalScale * 0.8;
            let fillHeight = 90 * this.personalScale * 0.8;
            let frameX = this.scale.width / 2 - 290 * this.personalScale * 0.8;
            let frameY = this.scale.height / 2 + (90 / 2) * this.personalScale * 0.8 + 40*this.personalScale;

            progressBar.fillRect(frameX, frameY, fillWidth, fillHeight);
        }, this);

        this.add.text(this.scale.width / 2, chargingBar.y - 250 * this.personalScale, 'Hilf uns, die Zutaten\nfür das Eis zu sammeln,\num die Antwort auf\ndas Quiz zu erhalten.', { 
            fontFamily: 'PressStart2P', 
            fontSize: 28*this.personalScale, 
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5);

        this.loadingText = this.add.text(
            this.scale.width / 2 - (6 * 30 * this.personalScale) / 2,
            this.scale.height / 2 + 20 * this.personalScale,
            'Lädt',
            {
                fontFamily: 'PressStart2P',
                fontSize: 30 * this.personalScale,
                fill: '#fff',
                align: 'center'
            }
        ).setOrigin(0, 0.5);

        const loadingStates = ['Lädt', 'Lädt.', 'Lädt..', 'Lädt...'];
        let currentIndex = 0;

        // Crea un evento ripetuto ogni 500ms per aggiornare il testo
        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                currentIndex = (currentIndex + 1) % loadingStates.length;
                this.loadingText.setText(loadingStates[currentIndex]);
            }
        });

        // Carica qui tutti gli asset necessari per il gioco
        if (this.chosenCharacter === 1) {
            this.load.spritesheet('player', 'assets/Sprites_player_m.png', {
                frameWidth: 72.5,
                frameHeight: 99,
                margin: 1,
                spacing: 0,
            });
        }
        else if (this.chosenCharacter === 2) {
            this.load.spritesheet('player', 'assets/Sprites_player_f.png', {
                frameWidth: 59.86,
                frameHeight: 92,
                margin: 1,
                spacing: 6.71,
            });
        }
        else console.log("Errore nel caricamento del chosenCharacter");

        this.load.image('ground', 'assets/Sprites_ground.png');
        this.load.image('flower', 'assets/Sprites_flowers.png');
        this.load.image('grass', 'assets/Sprites_grass.png');
        this.load.image('tree_1', 'assets/Sprites_tree_1.png');
        this.load.image('tree_2', 'assets/Sprites_tree_2.png');
        this.load.image('tree_3', 'assets/Sprites_tree_3.png');
        this.load.image('tree_4', 'assets/Sprites_tree_4.png');
        this.load.image('deepGround', 'assets/Sprites_deep-ground.png');
        this.load.image('box', 'assets/Sprites_box.png');
        this.load.image('skull_1', 'assets/Sprites_skeleton_1.png');
        this.load.image('skull_2', 'assets/Sprites_skeleton_2.png');
        this.load.image('skull_3', 'assets/Sprites_skeleton_3.png');
        this.load.image('direction_board', 'assets/Sprites_direction_board.png');
        this.load.image('end_board', 'assets/Sprites_end_board.png');
        this.load.spritesheet('boar', 'assets/Sprites_boar.png', {
            frameWidth: 133,
            frameHeight: 101
        });
        this.load.image('mushroom', 'assets/Sprites_mushroom.png');
        this.load.image('mushroom_smashed', 'assets/Sprites_mushroom_2.png');
        this.load.image('strawberry', 'assets/Sprites_strawberry.png');
        this.load.image('sugar', 'assets/Sprites_sugar_cube.png');
        this.load.image('blueberry', 'assets/Sprites_blueberry.png');
        this.load.image('acorn', 'assets/Sprites_acorn.png');
        this.load.image('acorn_expl_1', 'assets/Sprites_acorn_explosion_1.png');
        this.load.image('acorn_expl_2', 'assets/Sprites_acorn_explosion_2.png');

        // bottoni movimento
        this.load.image('buttonRight', 'assets/Sprites_right-arrow-button.png');
        this.load.image('buttonLeft', 'assets/Sprites_left-arrow-button.png');
        this.load.image('buttonUp', 'assets/Sprites_up-arrow-button.png');

        // audio
        this.load.audio('soundtrack', 'sounds/soundtrack.mp3');
        this.load.audio('jump', 'sounds/jump.mp3');
        this.load.audio('collect', 'sounds/coin.mp3');
        this.load.audio('boar', 'sounds/boar.mp3');
        this.load.audio('pop', 'sounds/pop.mp3');
        this.load.audio('jumpOver', 'sounds/jumpOver.mp3');
        this.load.audio('gameOver', 'sounds/gameOver.mp3');

        // bottoni volume
        this.load.image('volume_low', 'assets/Sprites_low-volume.png');
        this.load.image('volume_high', 'assets/Sprites_high-volume.png');
        this.load.image('volume_mute', 'assets/Sprites_no-volume.png');

        // vite
        this.load.image('emptyHeart', 'assets/Sprites_empty-heart.png');
        this.load.image('heart', 'assets/Sprites_heart.png');
    }

    create() {
        console.log("Sono nella PreloaderScene");
        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.time.delayedCall(800, () => {
            this.load.on('complete', function () {
                progressBar.destroy();
            });
            this.scene.start('FirstScene');
        });
    }
}

export default PreloaderScene;
