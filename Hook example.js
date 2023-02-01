h5gg.require(7.9);//Установить минимальный требуемый номер версии H5GG//Минимальная поддерживаемая версия для H5GG
 var h5frida=h5gg.loadPlugin("h5frida", "h5frida-15.1.24.dylib");
 if(!h5frida) throw "Не удалось загрузить плагин h5frida\n\nНе удалось загрузить плагин h5frida";
 если(!h5frida.loadGadget("frida-gadget-15.1.24.dylib"))
     throw "Не удалось загрузить модуль демона frida-gadget\n\nНе удалось загрузить модуль демона frida-gadget";
 var procs = h5frida.enumerate_processes();
 if(!procs || !procs.length) throw "frida не может получить список процессов\n\nfrida не может получить список процессов";
 var pid = -1; //pid=-1, используйте свой собственный процесс для вызова функций OC/C/C++ или присоединяйтесь к другим процессам APP для вызова
 переменная найдена = ложь;
 for(var i=0;i<проц. длина;i++) {
     если(procs[i].pid==pid) {
         if(procs[i].name!='Gadget') throw "Для тестов без джейлбрейка удалите deb-файл frida-server и перезапустите текущее приложение\nДля тестов без джейлбрейка удалите deb-файл frida-server и перезапустите текущее приложение" ;
         найдено = верно;
     }
 }
 if(!found) throw "frida не может найти целевой процесс\n\nfrida не может найти целевой процесс";
 var session = h5frida.attach(pid);
 if(!session) throw "Ошибка процесса подключения frida\n\nОшибка процесса подключения frida";

 //Контролировать состояние соединения целевого процесса frida, например аварийный выход
 session.on("отдельно", функция(причина) {
     alert("сеанс целевого процесса frida завершен (сеанс целевого процесса frida завершен):\n"+причина);
 });

 var frida_script_line = frida_script("getline");//консоль Safari автоматически добавит 2 строки
 var frida_script_code = "("+frida_script.toString()+")()"; //Преобразуем скрипт frida в строку
 var script = session.create_script(frida_script_code);//код JS-скрипта, введенный в frida

 if(!script) throw "Сбой сценария внедрения frida\n\nСбой сценария внедрения frida!";
 script.on('сообщение', function(msg) {
     если (msg.type == 'ошибка') {
         script.unload(); // Остановим скрипт frida, если в скрипте возникнет ошибка
         попробуйте {if(msg.fileName=="/frida_script.js") msg.lineNumber += frida_script_line-1;} catch(e) {}
         if(Array.isArray(msg.info)) msg.info.map(function(item){ try { if(item.fileName=="/frida_script.js")
             item.lineNumber += frida_script_line-1;} catch(e) {};вернуть элемент;});
         var errmsg = JSON.stringify(msg,null,1).replace(/\/frida_script\.js\:(\d+)/gm,
             function(m,c,o,a){return "/frida_script.js:"+(Number(c)+frida_script_line-1);});
         alert("frida(ошибка скрипта)ошибка скрипта:\n"+errmsg.replaceAll("\\n","\n"));
     }
    
     если (msg.type == 'отправить')
         alert("frida(сообщение сценария) srcipt msg:\n"+JSON.stringify(msg.payload,null,1));
     если (msg.type == 'журнал')
         alert("Журнал скриптов frida(script log):\n"+msg.payload);
 });

 if(!script.load()) throw "Ошибка запуска сценария frida\n\nОшибка сценария загрузки frida"; //запустить сценарий
 function frida_script() { if(arguments.length) return new Error().line;
                         
                         
             /*ВОТ НАШ СВЯЗЬ*/
                         
                         
 var Jump = h5frida.StaticInlineHookFunction("Frameworks/UnityFramework.framework/UnityFramework",
     0x1B39598,
     "бул",
     ["указатель"],
     функция (экземпляр) {
         //возвращаем 1 если правда, 0 если ложь
         вернуть 1;
     }
 );