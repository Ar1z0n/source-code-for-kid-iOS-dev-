{
  h5gg.require(7.9);

var h5frida=h5gg.loadPlugin("h5frida", "h5frida-15.1.24.dylib");
if(!h5frida) throw "Ошибка!\n\nТы даун!";

function ActiveCodePatch(fpath, vaddr, bytes) {
    if(!h5frida.ActiveCodePatch(fpath, vaddr, bytes)) {
        var result = h5frida.ApplyCodePatch(fpath, vaddr, bytes);
        alert(fpath+":0x"+vaddr.toString(16)+"-修改失败!\n" + fpath+":0x"+vaddr.toString(16)+"-PatchFailed!\n" + result);return false;
    } return true;
}
function DeactiveCodePatch(fpath, vaddr, bytes) {
    return h5frida.DeactiveCodePatch(fpath, vaddr, bytes);
} 

ActiveCodePatch("Frameworks/UnityFramework.framework/UnityFramework", 0x1C91360, "C0035FD6");

}