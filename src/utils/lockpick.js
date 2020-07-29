function convertAngleToXLength(angle, radius) {
	const radians = (angle*Math.PI)/180
	return radius*sin(radians)
}

const startPosition = [0, 100]

const DIFFICULTY_X_LENGTH_MAP = {
	"Novice": convertAngleToXLength(12, startPosition[1]),
	"Apprentice": convertAngleToXLength(10, startPosition[1]),
	"Adept": convertAngleToXLength(8, startPosition[1]),
	"Expert": convertAngleToXLength(6, startPosition[1]),
	"Master": convertAngleToXLength(4, startPosition[1])
}

class Lockpick {
	constructor() {
		const self = this;
		// [x, y]
		const startPos = startPosition
		const endPos1 = [startPosition[1], startPosition[0]]
		const endPos2 = [-startPosition[1], startPosition[0]]
		this.currentPos = startPosition
		this.lockpicks = 100;
		this.difficulty = "Novice";
		this.sectorXLength = DIFFICULTY_X_LENGTH_MAP[this.difficulty];
		this.winningSectorXRange = this.chooseWinningSectorXRange();
		this.determiningSectorXRange = [(this.winningSectorXRange[0] - (Math.floor(this.sectorXLength/2))), (this.winningSectorXRange[0] + (Math.floor(this.sectorXLength/2)))];
	}

	chooseWinningSectorXRange() {
		const radius = this.startPos[1];
		const sectorDifference = radius - this.sectorXLength;
		const startXSector = LockPick.randomInteger(-sectorDifference, sectorDifference);
		const dir = randomInteger(0, 1);
		return (!!dir ? [startXSector - this.sectorXLength, startXSector] : [startXSector, startXSector + this.sectorXLength])
	}

	static randomInteger(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}