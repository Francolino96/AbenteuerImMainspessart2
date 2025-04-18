import {
    spawnDecor,
    spawnSkull,
    createIngredients,
    createAcorns,
    updateAcorns,
    createEnemy,
    updateEnemy,
    updateIngredients,
    updatePlayer,
    createPlayer,
    createFish,
    createGround,
    updateWater,
    createPlatforms,
    initializeScene,
    initializeSceneInputs
} from '../utils.js';

class WaterScene extends Phaser.Scene {

    constructor() {
        super({ key: 'WaterScene' });
    }

    create() {     
        initializeScene(this, 'WaterScene', 'water_background');
        const gapPercentages = [0.2, 0.5, 0.8];
        const gapWidth = 800 * this.personalScale;
        createGround(this, gapPercentages, gapWidth, true);

        spawnDecor(this, 1.6, true, 'appleTree2', 0.0005 * this.mapWidth, this.mapWidth * 0.2, this.mapWidth - 500 * this.personalScale, gapPercentages, gapWidth, this.boxWidth);
        
        createPlatforms(this, 2, this.lev3PlatformHeight, 100);
        createPlatforms(this, 3, this.lev1PlatformHeight, 300);
        createPlatforms(this, 1, this.lev2PlatformHeight, 600);
        createPlatforms(this, 4, this.lev2PlatformHeight, 800);
        createPlatforms(this, 1, this.lev3PlatformHeight, 1300);
        createPlatforms(this, 3, this.lev2PlatformHeight, 1700);
        createPlatforms(this, 3, this.lev1PlatformHeight, 2200);

        spawnDecor(this, 1, true, 'flower', 0.004 * this.mapWidth, 0, this.mapWidth, gapPercentages, gapWidth, this.boxWidth);
        spawnDecor(this, 1, true, 'grass', 0.015 * this.mapWidth, 0, this.mapWidth, gapPercentages, gapWidth, this.boxWidth);
        spawnDecor(this, 1, false, 'direction_board', 1, this.mapWidth * 0.35, this.mapWidth * 0.65, gapPercentages, gapWidth, this.boxWidth);
        spawnDecor(this, 1, false, 'end_board', 1, this.mapWidth - this.finishPoint *this.personalScale, this.mapWidth - this.finishPoint * this.personalScale, gapPercentages, gapWidth, this.boxWidth);
        spawnDecor(this, 1.3, true, 'fence', 6 * this.personalScale, 0, this.mapWidth - this.finishPoint *this.personalScale - 50 * this.personalScale, gapPercentages, gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_1', gapPercentages, gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_1', gapPercentages, gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_2', gapPercentages, gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_3', gapPercentages, gapWidth, this.boxWidth);

        createFish(this, gapPercentages, gapWidth);
        createPlayer(this);

        this.hazelnutNumber = 5;
        this.hazelnuts = createIngredients(
            this,
            'hazelnut',
            { x: 12, y: 0, stepX: 200 },
            { min: 100, max: this.mapWidth - this.finishPoint * this.personalScale - 50 },
            { min: 50, max: 300 }
        );

        this.milkNumber = 5;
        this.milk = createIngredients(
            this,
            'milk',
            { x: 12, y: 0, stepX: 200 },
            { min: 100, max: this.mapWidth - this.finishPoint * this.personalScale - 50 },
            { min: 50, max: 300 }
        );
        updateWater(this);
        spawnDecor(this, 1, true, 'grass', 0.006 * this.mapWidth, 0, this.mapWidth, gapPercentages, gapWidth, this.boxWidth);       
        createAcorns(this, 4, 'WaterScene');
        createEnemy(this, 500 * this.personalScale, 'snake', 350, 3);
        initializeSceneInputs(this, 'hazelnut', 'milk');
    }

    update() {
        if (this.gameOver || this.victory) return;
        updatePlayer(this);
        updateAcorns(this);
        updateIngredients(this, this.milk, { min: 100 * this.personalScale, max: this.mapWidth - 100 * this.personalScale });
        updateIngredients(this, this.hazelnuts, { min: 100 * this.personalScale, max: this.mapWidth - 100 * this.personalScale });
        updateEnemy(this, 100 * this.personalScale, this.mapWidth - 100 * this.personalScale, 350);
    }
}

export default WaterScene;