function example (){
    var inventoryID= prompt("Skin id in inventory:");
    var wantskinID = prompt("Any skin you want :");
    h5gg.searchNumber(inventoryID, 'I32', '0x00000000', '0x1600000000');
    h5gg.editAll(wantskinID,'I32');
    alert("Fine!");
    h5gg.clearResults();
    }