
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;

let text, button;

function _setWallpaper(path) {
   let bg_settings = new Gio.Settings({
      schema_id: 'org.gnome.desktop.background'
   });
   bg_settings.set_value('picture-uri', new GLib.Variant('s', path));
   bg_settings.set_value('picture-options', new GLib.Variant('s', 'wallpaper'));
}

function _listDir(path) {
   let dir = Gio.file_new_for_path(path);
   let fenum = dir.enumerate_children('*', Gio.FileQueryInfoFlags.NONE, null);
   let info;
   let flist = new Array();
   while((info=fenum.next_file(null))){
      flist.push(path+"/"+info.get_name());
   }
   return flist;
}

function _getWallpaper() {
   let flist = _listDir('/home/watson/Pictures');
   return flist[GLib.random_int_range(0, flist.length)];
}

function _rotateWallpaper() {
   var wp = _getWallpaper()
   _setWallpaper(wp);
   //_showHello(wp);
   return true;
}
/*
function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello(msg) {
    if (!text) {
        text = new St.Label({ style_class: 'hellorld-label', text: "Hello, world!"+msg });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height / 2 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}
*/
function init() {
/*
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _showHello);
*/
    Mainloop.timeout_add(1000*60, _rotateWallpaper);
}

function enable() {
    //Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    //Main.panel._rightBox.remove_child(button);
}
