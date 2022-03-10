export default class {
	constructor() {
		this.currentId = -1;
		this.selectedIdList = [];
	}

	removeDuplicated(arr) {
		arr = arr.filter(function (item, pos, self) {
			return self.indexOf(item) == pos;
		})
	} Î

	pushSelected(selectId) {
		this.selectedIdList.push(selectId);
		this.removeDuplicated(this.selectedIdList);
	}
}
