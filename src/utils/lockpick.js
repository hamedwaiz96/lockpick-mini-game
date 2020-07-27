function convertAngleToXLength(angle, radius) {
	const radians = (angle*Math.PI)/180
	return radius*sin(radians)
}

const startPosition = [0, 100]

const DIFFICULTY_X_LENGTH_MAP = {
	"Novice": convertAngleToXLength(10, startPosition[1]),
	""
}

class Lockpick() {

	constructor() {
		const self = this;
		// [x, y]
		const startPos = startPosition
		const endPos1 = [startPosition[1], startPosition[0]]
		const endPos2 = [-startPosition[1], startPosition[0]]
		this.currentPos = startPosition
		this.lockpicks = 100;
		this.difficulty = "Novice";
		this.sectorAngle = DIFFICULTY_SECTOR_ANGLE_MAP[this.difficulty];
	}

	chooseWinningSectorXRange() {
		const radius = this.startPos[1];
		const removeDistance = 
		const sectorX = LockPick.randomInteger()
	}

	static randomInteger(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}