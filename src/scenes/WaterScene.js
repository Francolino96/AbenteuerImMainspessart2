import {
    spawnDecor,
    spawnSkull,
    createIngredients,
    createFlies,
    spawnGapEnemies,
    updateEnemy,
    updateIngredients,
    updatePlayer,
    createPlayer,
    createFish,
    createGround,
    updateWater,
    createPlatforms,
    initializeScene,
    initializeSceneInputs,
    createRafts,
    updateRafts
} from '../utils.js';

class WaterScene extends Phaser.Scene {

    constructor() {
        console.log("Sono nel constructor del waterScene");
        super({ key: 'WaterScene' });
    }

    create() {
        console.log("Sono nella waterscene"); 
        initializeScene(this, 'WaterScene', 'water_background');
        const gapPercentages = [0.2, 0.5, 0.65, 0.8];
        this.gapWidth = 1200 * this.personalScale;
        createGround(this, gapPercentages, this.gapWidth, true);

        spawnDecor(this, 1.3, true, 'stiancia', 0.001 * this.mapWidth, this.mapWidth * 0.2, this.mapWidth - 500 * this.personalScale, gapPercentages, this.gapWidth, this.boxWidth);
        
        createPlatforms(this, 2, this.lev3PlatformHeight, 100);
        createPlatforms(this, 3, this.lev1PlatformHeight, 300);
        createPlatforms(this, 1, this.lev2PlatformHeight, 600);
        createPlatforms(this, 4, this.lev2PlatformHeight, 800);
        createPlatforms(this, 1, this.lev3PlatformHeight, 1300);
        createPlatforms(this, 3, this.lev2PlatformHeight, 1700);
        createPlatforms(this, 3, this.lev1PlatformHeight, 2200);

        spawnDecor(this, 1, true, 'flower', 0.004 * this.mapWidth, 0, this.mapWidth, gapPercentages, this.gapWidth, this.boxWidth);
        spawnDecor(this, 1, true, 'grass', 0.015 * this.mapWidth, 0, this.mapWidth, gapPercentages, this.gapWidth, this.boxWidth);
        spawnDecor(this, 1, false, 'direction_board', 1, this.mapWidth * 0.35, this.mapWidth * 0.65, gapPercentages, this.gapWidth, this.boxWidth);
        spawnDecor(this, 1.3, true, 'fence', 6 * this.personalScale, 0, this.mapWidth - this.finishPoint *this.personalScale - 50 * this.personalScale, gapPercentages, this.gapWidth, this.boxWidth);
        spawnDecor(this, 1, false, 'end_board', 1, this.mapWidth - this.finishPoint *this.personalScale, this.mapWidth - this.finishPoint * this.personalScale, gapPercentages, this.gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_1', gapPercentages, this.gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_1', gapPercentages, this.gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_2', gapPercentages, this.gapWidth, this.boxWidth);
        spawnSkull(this, 'skull_3', gapPercentages, this.gapWidth, this.boxWidth);

        console.log("Ciao Mondo 1");
        createFish(this, gapPercentages, this.gapWidth);
        createPlayer(this);
        this.events.on('preupdate', () => {
            this.player.currentRaft = null;
        });

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
        spawnDecor(this, 1, true, 'grass', 0.006 * this.mapWidth, 0, this.mapWidth, gapPercentages, this.gapWidth, this.boxWidth);       
        createFlies(this, 6, 'fly', 2, 200);
        const excludedGaps = [ 2, 3 ];
        this.snakes = spawnGapEnemies(this, 'snake', gapPercentages, 350, 3, excludedGaps);
        createRafts(this, gapPercentages, this.gapWidth, 300);
        initializeSceneInputs(this, 'hazelnut', 'milk');
    }

    update() {
        if (this.gameOver || this.victory) return;
        updatePlayer(this);
        updateIngredients(this, this.milk, { min: 100 * this.personalScale, max: this.mapWidth - 100 * this.personalScale - this.finishPoint *this.personalScale });
        updateIngredients(this, this.hazelnuts, { min: 100 * this.personalScale, max: this.mapWidth - 100 * this.personalScale - this.finishPoint *this.personalScale });
        this.snakes.forEach(({ enemy, bounds }) => {
            updateEnemy(this, enemy, bounds.lBound, bounds.rBound, 350);
        });
        updateRafts(this, 300);
    }
}

export default WaterScene;