//region {variables and functions}
var folders = [];
var listName = "list";
var host = "developer.chrome.com";
var itemBorderRightStyle = "5px solid #666";
var itemBoxShadowStyle = "0px 0px 2px #333";
var itemBackgroundColor = "#ccc";
var storageKey = "APPEND_MATCHING_ONLY";
function appendItem(listElement,nodeURL,nodeParentTitle) {
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = nodeURL;
	a.innerText = nodeURL + " (" + nodeParentTitle + ")";
	li.appendChild(a);
	if(nodeURL.indexOf(host) != -1) {
		li.style.borderRight = itemBorderRightStyle;
		li.style.boxShadow = itemBoxShadowStyle;
		li.style.backgroundColor = itemBackgroundColor;
	}
	listElement.appendChild(li);
}
function appendMatchingItem(listElement,nodeURL,nodeParentTitle) {
	if(nodeURL.indexOf(host) != -1) appendItem(listElement,nodeURL,nodeParentTitle);
}
function populateList(listElement) {
	folders.forEach(function(folder) {
		folder.children.forEach(function(bookmarkTreeNode) {
			appendItem(listElement,bookmarkTreeNode.url,folder.title);
		});
	});
}
function populateListV2(listElement) {
	chrome.storage.sync.get(storageKey,function(items) {
		if(!chrome.runtime.lastError && items[storageKey]) {
			folders.forEach(function(folder) {
				folder.children.forEach(function(bookmarkTreeNode) {
					if(bookmarkTreeNode.url)
						appendMatchingItem(listElement,bookmarkTreeNode.url,folder.title);
				});
			});
		} else {
			folders.forEach(function(folder) {
				folder.children.forEach(function(bookmarkTreeNode) {
					if(bookmarkTreeNode.url)
						appendItem(listElement,bookmarkTreeNode.url,folder.title);
				});
			});
		}
	});
}
//end-region



//region {calls}
document.addEventListener("DOMContentLoaded",function(dcle) {
	var listElement = document.getElementById(listName);
	chrome.bookmarks.getTree(function(bookmarkTreeAsArray) {
		var bookmarkTree = bookmarkTreeAsArray[0];
		if(bookmarkTree.children) {
			bookmarkTree.children.forEach(function(node) {
				if(node.children.length > 0) folders.push(node);
			});
		}
		//populateList(listElement);
		populateListV2(listElement);
	});
});
//end-region