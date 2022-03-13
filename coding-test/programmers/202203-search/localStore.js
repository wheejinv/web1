export function getSelected() {
	if (!localStorage.getItem('selected')) {
		return [];
	} else {
		let stringResult = localStorage.getItem('selected');
		return JSON.parse(stringResult);
	}
}

export function addSelected(selectText) {
	let selectedList = getSelected();

	const findIndex = selectedList.findIndex(text => text === selectText);

	if (findIndex > -1) {
		selectedList.splice(findIndex, 1);
	}

	selectedList.push(selectText);

	if (selectedList.length > 5) {
		selectedList.shift();
	}

	localStorage.setItem('selected', JSON.stringify(selectedList));
}
